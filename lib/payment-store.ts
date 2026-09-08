import "server-only";

export type PaymentStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "REVERSED"
  | "INVALID"
  | "PAYMENT_INITIATION_FAILED";

export interface PaymentRecord {
  id: string;
  merchant_reference: string;
  pesapal_tracking_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  amount: number;
  currency: string;
  payment_method: string | null;
  payment_account_masked: string | null;
  confirmation_code: string | null;
  payment_status: PaymentStatus;
  pesapal_status_code: number | null;
  description: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, unknown>;
}

export interface CreatePaymentInput {
  merchant_reference: string;
  first_name: string;
  last_name: string;
  email: string;
  amount: number;
  currency?: string;
  description: string;
  metadata?: Record<string, unknown>;
}

export interface UpdatePaymentStatusInput {
  merchant_reference: string;
  pesapal_tracking_id?: string | null;
  payment_status: PaymentStatus;
  payment_method?: string | null;
  payment_account_masked?: string | null;
  confirmation_code?: string | null;
  pesapal_status_code?: number | null;
  metadata?: Record<string, unknown>;
}

class PaymentStore {
  private records = new Map<string, PaymentRecord>();
  private refIndex = new Map<string, string>(); // merchant_reference -> id
  private trackingIndex = new Map<string, string>(); // pesapal_tracking_id -> id

  public createPayment(input: CreatePaymentInput): PaymentRecord {
    if (this.refIndex.has(input.merchant_reference)) {
      throw new Error(`Duplicate merchant reference: ${input.merchant_reference}`);
    }

    const now = new Date().toISOString();
    const id = `pay_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    const record: PaymentRecord = {
      id,
      merchant_reference: input.merchant_reference,
      pesapal_tracking_id: null,
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      amount: input.amount,
      currency: input.currency ?? "UGX",
      payment_method: null,
      payment_account_masked: null,
      confirmation_code: null,
      payment_status: "PENDING",
      pesapal_status_code: null,
      description: input.description,
      created_at: now,
      updated_at: now,
      metadata: input.metadata,
    };

    this.records.set(id, record);
    this.refIndex.set(input.merchant_reference, id);

    return { ...record };
  }

  public setTrackingId(merchantReference: string, trackingId: string): PaymentRecord | null {
    const id = this.refIndex.get(merchantReference);
    if (!id) return null;

    const record = this.records.get(id);
    if (!record) return null;

    record.pesapal_tracking_id = trackingId;
    record.updated_at = new Date().toISOString();
    this.trackingIndex.set(trackingId, id);

    return { ...record };
  }

  public getByMerchantReference(merchantReference: string): PaymentRecord | null {
    const id = this.refIndex.get(merchantReference);
    if (!id) return null;
    const record = this.records.get(id);
    return record ? { ...record } : null;
  }

  public getByTrackingId(trackingId: string): PaymentRecord | null {
    const id = this.trackingIndex.get(trackingId);
    if (!id) return null;
    const record = this.records.get(id);
    return record ? { ...record } : null;
  }

  public getById(id: string): PaymentRecord | null {
    const record = this.records.get(id);
    return record ? { ...record } : null;
  }

  public updateStatus(input: UpdatePaymentStatusInput): PaymentRecord | null {
    let id = this.refIndex.get(input.merchant_reference);

    if (!id && input.pesapal_tracking_id) {
      id = this.trackingIndex.get(input.pesapal_tracking_id);
    }

    if (!id) return null;

    const record = this.records.get(id);
    if (!record) return null;

    // Idempotency check: If already COMPLETED, do not overwrite back to PENDING or FAILED
    if (record.payment_status === "COMPLETED" && input.payment_status !== "COMPLETED") {
      return { ...record };
    }

    record.payment_status = input.payment_status;
    record.updated_at = new Date().toISOString();

    if (input.pesapal_tracking_id) {
      record.pesapal_tracking_id = input.pesapal_tracking_id;
      this.trackingIndex.set(input.pesapal_tracking_id, id);
    }
    if (input.payment_method !== undefined) {
      record.payment_method = input.payment_method;
    }
    if (input.payment_account_masked !== undefined) {
      record.payment_account_masked = input.payment_account_masked;
    }
    if (input.confirmation_code !== undefined) {
      record.confirmation_code = input.confirmation_code;
    }
    if (input.pesapal_status_code !== undefined) {
      record.pesapal_status_code = input.pesapal_status_code;
    }
    if (input.metadata) {
      record.metadata = { ...record.metadata, ...input.metadata };
    }

    return { ...record };
  }

  public listAll(): PaymentRecord[] {
    return Array.from(this.records.values()).map((r) => ({ ...r }));
  }

  public clearForTesting(): void {
    this.records.clear();
    this.refIndex.clear();
    this.trackingIndex.clear();
  }
}

// Preserve across HMR in development
const globalForPayment = globalThis as unknown as {
  __pesapal_payment_store__?: PaymentStore;
};

export const paymentStore =
  globalForPayment.__pesapal_payment_store__ ?? new PaymentStore();

if (process.env.NODE_ENV !== "production") {
  globalForPayment.__pesapal_payment_store__ = paymentStore;
}
