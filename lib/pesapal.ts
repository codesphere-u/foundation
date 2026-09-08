import "server-only";

export interface PesapalConfig {
  consumerKey: string;
  consumerSecret: string;
  ipnId: string;
  baseUrl: string;
  appBaseUrl: string;
}

export interface PesapalAuthResponse {
  token: string;
  expiryDate: string;
  status: string;
  message?: string;
  error?: unknown;
}

export interface PesapalBillingAddress {
  email_address: string;
  phone_number?: string;
  country_code: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  line_1?: string;
  line_2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  zip_code?: string;
}

export interface PesapalOrderRequest {
  id: string; // Merchant reference
  currency: string; // e.g. "UGX"
  amount: number;
  description: string;
  callback_url: string;
  cancellation_url?: string;
  notification_id: string;
  billing_address: PesapalBillingAddress;
}

export interface PesapalOrderResponse {
  order_tracking_id: string;
  merchant_reference: string;
  redirect_url: string;
  error?: {
    error_type?: string;
    code?: string;
    message?: string;
  } | null;
  status: string;
  message?: string;
}

export interface PesapalTransactionStatus {
  payment_method: string | null;
  amount: number;
  created_date: string;
  confirmation_code: string | null;
  payment_status_description: "COMPLETED" | "FAILED" | "REVERSED" | "INVALID" | string;
  description: string | null;
  message: string | null;
  payment_account: string | null;
  call_back_url: string | null;
  status_code: number;
  merchant_reference: string;
  account_number: string | null;
  payment_status_code: string | null;
  currency: string;
  error?: unknown;
  status: string;
}

export interface PesapalRegisterIpnResponse {
  url: string;
  created_date: string;
  ipn_id: string;
  error?: unknown;
  status: string;
}

export interface PesapalIpnItem {
  url: string;
  created_date: string;
  ipn_id: string;
  error?: unknown;
  status: string;
}

const PRODUCTION_API_URL = "https://pay.pesapal.com/v3";
const SANDBOX_API_URL = "https://cybqa.pesapal.com/pesapalv3";
const DEFAULT_TIMEOUT_MS = 15000;

// In-memory token cache
interface CachedToken {
  token: string;
  expiresAt: number; // Unix timestamp in ms
}

let cachedToken: CachedToken | null = null;

export function getPesapalConfig(): PesapalConfig {
  const consumerKey = process.env.PESAPAL_CONSUMER_KEY?.trim() || "";
  const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET?.trim() || "";
  const ipnId = process.env.PESAPAL_IPN_ID?.trim() || "";
  const appBaseUrl = (process.env.APP_BASE_URL?.trim() || "https://hafisamagezi.org").replace(/\/$/, "");

  const envMode = (process.env.PESAPAL_ENV || "production").toLowerCase().trim();
  const baseUrl = envMode === "sandbox" ? SANDBOX_API_URL : PRODUCTION_API_URL;

  return {
    consumerKey,
    consumerSecret,
    ipnId,
    baseUrl,
    appBaseUrl,
  };
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = DEFAULT_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Authenticates with Pesapal API 3.0.
 * Reuses active cached bearer token if unexpired.
 */
export async function getPesapalToken(forceRefresh = false): Promise<string> {
  const config = getPesapalConfig();

  if (!config.consumerKey || !config.consumerSecret) {
    throw new Error("Missing PESAPAL_CONSUMER_KEY or PESAPAL_CONSUMER_SECRET in environment variables.");
  }

  const now = Date.now();
  if (!forceRefresh && cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.token;
  }

  const authUrl = `${config.baseUrl}/api/Auth/RequestToken`;
  console.info("[Pesapal] Authenticating server-to-server with Pesapal...");

  let response: Response;
  try {
    response = await fetchWithTimeout(authUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        consumer_key: config.consumerKey,
        consumer_secret: config.consumerSecret,
      }),
      cache: "no-store",
    });
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && err.name === "AbortError";
    console.error("[Pesapal] Auth request failed:", isTimeout ? "Request timed out" : "Network error");
    throw new Error(isTimeout ? "Pesapal authentication timed out." : "Unable to reach Pesapal authentication service.");
  }

  if (!response.ok) {
    console.error(`[Pesapal] Auth HTTP error status: ${response.status}`);
    throw new Error(`Pesapal authentication failed with status ${response.status}.`);
  }

  let data: PesapalAuthResponse;
  try {
    data = (await response.json()) as PesapalAuthResponse;
  } catch {
    throw new Error("Pesapal returned malformed JSON during authentication.");
  }

  if (!data.token) {
    console.error("[Pesapal] Auth response missing token:", data.message || "Unknown error");
    throw new Error(data.message || "Pesapal authentication succeeded without a valid token.");
  }

  // Parse expiry (typically ISO date string or 5 minutes)
  let expiresAt = now + 4 * 60 * 1000;
  if (data.expiryDate) {
    const parsed = Date.parse(data.expiryDate);
    if (!Number.isNaN(parsed) && parsed > now) {
      expiresAt = parsed;
    }
  }

  cachedToken = {
    token: data.token,
    expiresAt,
  };

  console.info("[Pesapal] Authentication successful. Token cached.");
  return data.token;
}

/**
 * Submits an order request to Pesapal API 3.0.
 */
export async function submitPesapalOrder(
  order: PesapalOrderRequest
): Promise<PesapalOrderResponse> {
  const config = getPesapalConfig();
  const token = await getPesapalToken();

  const submitUrl = `${config.baseUrl}/api/Transactions/SubmitOrderRequest`;
  console.info(`[Pesapal] Submitting order: ref=${order.id}, amount=${order.currency} ${order.amount}`);

  let response: Response;
  try {
    response = await fetchWithTimeout(submitUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
      cache: "no-store",
    });
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && err.name === "AbortError";
    console.error(`[Pesapal] Submit order request failed for ref=${order.id}:`, isTimeout ? "Timeout" : "Network error");
    throw new Error(isTimeout ? "Pesapal order submission timed out." : "Unable to connect to Pesapal order service.");
  }

  // If 401 Unauthorized, token might have been invalidated; retry once with fresh token
  if (response.status === 401) {
    console.warn(`[Pesapal] 401 Unauthorized for ref=${order.id}. Refreshing token and retrying...`);
    const freshToken = await getPesapalToken(true);
    response = await fetchWithTimeout(submitUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${freshToken}`,
      },
      body: JSON.stringify(order),
      cache: "no-store",
    });
  }

  if (!response.ok) {
    console.error(`[Pesapal] Submit order failed HTTP ${response.status} for ref=${order.id}`);
    throw new Error(`Pesapal order submission failed with HTTP status ${response.status}.`);
  }

  let data: PesapalOrderResponse;
  try {
    data = (await response.json()) as PesapalOrderResponse;
  } catch {
    throw new Error("Pesapal returned malformed JSON during order submission.");
  }

  if (!data.redirect_url || !data.order_tracking_id) {
    const errorMsg = data.error?.message || data.message || "Missing redirect_url or tracking ID from Pesapal";
    console.error(`[Pesapal] Order submission error for ref=${order.id}: ${errorMsg}`);
    throw new Error(`Failed to initialize payment portal: ${errorMsg}`);
  }

  console.info(`[Pesapal] Order created: ref=${order.id}, trackingId=${data.order_tracking_id}`);
  return data;
}

/**
 * Authoritatively queries the transaction status from Pesapal.
 */
export async function getPesapalTransactionStatus(
  orderTrackingId: string
): Promise<PesapalTransactionStatus> {
  if (!orderTrackingId || typeof orderTrackingId !== "string") {
    throw new Error("orderTrackingId is required to query transaction status.");
  }

  const config = getPesapalConfig();
  const token = await getPesapalToken();

  const statusUrl = `${config.baseUrl}/api/Transactions/GetTransactionStatus?orderTrackingId=${encodeURIComponent(
    orderTrackingId.trim()
  )}`;

  console.info(`[Pesapal] Querying authoritative status for trackingId=${orderTrackingId}`);

  let response: Response;
  try {
    response = await fetchWithTimeout(statusUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && err.name === "AbortError";
    console.error(`[Pesapal] GetTransactionStatus failed for trackingId=${orderTrackingId}:`, isTimeout ? "Timeout" : "Network error");
    throw new Error(isTimeout ? "Pesapal status query timed out." : "Unable to reach Pesapal transaction status service.");
  }

  if (response.status === 401) {
    console.warn(`[Pesapal] 401 Unauthorized for trackingId=${orderTrackingId}. Refreshing token...`);
    const freshToken = await getPesapalToken(true);
    response = await fetchWithTimeout(statusUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${freshToken}`,
      },
      cache: "no-store",
    });
  }

  if (!response.ok) {
    console.error(`[Pesapal] GetTransactionStatus failed HTTP ${response.status} for trackingId=${orderTrackingId}`);
    throw new Error(`Failed to fetch Pesapal transaction status with HTTP ${response.status}.`);
  }

  let data: PesapalTransactionStatus;
  try {
    data = (await response.json()) as PesapalTransactionStatus;
  } catch {
    throw new Error("Pesapal returned malformed JSON for transaction status.");
  }

  console.info(
    `[Pesapal] Transaction status: trackingId=${orderTrackingId}, status=${data.payment_status_description}, amount=${data.currency} ${data.amount}`
  );
  return data;
}

/**
 * Registers an IPN URL with Pesapal API 3.0.
 */
export async function registerPesapalIPN(
  webhookUrl: string,
  notificationType: "GET" | "POST" = "GET"
): Promise<PesapalRegisterIpnResponse> {
  const config = getPesapalConfig();
  const token = await getPesapalToken();

  const registerUrl = `${config.baseUrl}/api/URLSetup/RegisterIPN`;

  const response = await fetchWithTimeout(registerUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: webhookUrl,
      ipn_notification_type: notificationType,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to register IPN with status ${response.status}`);
  }

  return (await response.json()) as PesapalRegisterIpnResponse;
}

/**
 * Lists registered IPNs from Pesapal API 3.0.
 */
export async function getPesapalIPNs(): Promise<PesapalIpnItem[]> {
  const config = getPesapalConfig();
  const token = await getPesapalToken();

  const listUrl = `${config.baseUrl}/api/URLSetup/GetIPNList`;

  const response = await fetchWithTimeout(listUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get IPN list with status ${response.status}`);
  }

  return (await response.json()) as PesapalIpnItem[];
}
