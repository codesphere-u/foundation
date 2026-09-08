/**
 * Utility script to register or list Pesapal API 3.0 IPN URLs.
 * Usage:
 *   node scripts/register-ipn.mjs [register|list]
 */
import fs from "fs";
import path from "path";

// Simple .env.local reader
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

loadEnv();

const key = process.env.PESAPAL_CONSUMER_KEY;
const secret = process.env.PESAPAL_CONSUMER_SECRET;
const baseUrl =
  (process.env.PESAPAL_ENV || "production").toLowerCase() === "sandbox"
    ? "https://cybqa.pesapal.com/pesapalv3"
    : "https://pay.pesapal.com/v3";
const appBaseUrl = (process.env.APP_BASE_URL || "https://hafisamagezi.org").replace(/\/$/, "");

if (!key || !secret) {
  console.error("❌ Missing PESAPAL_CONSUMER_KEY or PESAPAL_CONSUMER_SECRET in .env.local");
  process.exit(1);
}

async function main() {
  const action = process.argv[2] || "list";

  console.log(`📡 Connecting to Pesapal API 3.0 at: ${baseUrl}`);
  console.log(`🔐 Authenticating with consumer key: ${key.slice(0, 6)}...`);

  // Step 1: Request Token
  const authRes = await fetch(`${baseUrl}/api/Auth/RequestToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ consumer_key: key, consumer_secret: secret }),
  });

  if (!authRes.ok) {
    console.error(`❌ Authentication failed: HTTP ${authRes.status}`, await authRes.text());
    process.exit(1);
  }

  const authData = await authRes.json();
  const token = authData.token;
  console.log("✅ Authenticated successfully! (Token cached for session)");

  if (action === "list") {
    console.log("\n📋 Fetching existing registered IPNs...");
    const listRes = await fetch(`${baseUrl}/api/URLSetup/GetIPNList`, {
      method: "GET",
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });

    if (!listRes.ok) {
      console.error(`❌ Failed to list IPNs: HTTP ${listRes.status}`, await listRes.text());
      process.exit(1);
    }

    const ipns = await listRes.json();
    console.log("Registered IPNs:", JSON.stringify(ipns, null, 2));
    console.log("\n💡 To register a new IPN endpoint, run: node scripts/register-ipn.mjs register");
  } else if (action === "register") {
    const webhookUrl = `${appBaseUrl}/api/pesapal-webhook`;
    console.log(`\n📝 Registering Webhook IPN URL: ${webhookUrl}`);

    const regRes = await fetch(`${baseUrl}/api/URLSetup/RegisterIPN`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url: webhookUrl,
        ipn_notification_type: "GET",
      }),
    });

    if (!regRes.ok) {
      console.error(`❌ Registration failed: HTTP ${regRes.status}`, await regRes.text());
      process.exit(1);
    }

    const regData = await regRes.json();
    console.log("🎉 IPN Registered Successfully!");
    console.log("Result:", JSON.stringify(regData, null, 2));
    console.log(`\n👉 Copy the ipn_id above into your .env.local:`);
    console.log(`PESAPAL_IPN_ID="${regData.ipn_id}"`);
  }
}

main().catch((err) => {
  console.error("❌ Unexpected error:", err);
  process.exit(1);
});
