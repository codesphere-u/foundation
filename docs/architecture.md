# Hafisa Magezi Foundation - Technical Architecture

## 1. System Overview

The **Hafisa Magezi Foundation Platform** is a modern, high-performance web platform built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and Framer Motion. It serves as both the digital home of the foundation and a resilient payment and donation processing gateway integrated with **Pesapal API 3.0** to support East African mobile money (MTN Mobile Money, Airtel Money) and international card rails.

---

## 2. Architecture Blueprint

```text
+-----------------------------------------------------------------------------------+
|                        Client Layer (Donors & Visitors)                           |
+-----------------------------------------+-----------------------------------------+
                                          |
                     HTTPS / Next.js 16 App Router Routes
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                            Next.js 16 Edge / Server Runtime                       |
|                                                                                   |
|  Pages & Dynamic Routes:                                                          |
|   - / (Home)                     - /about              - /programs                |
|   - /donate                      - /payment-success    - /payment-failed          |
+-------------------+-------------------------------------------+-------------------+
                    |                                           |
                    | API Requests                              | Webhook Notifications
                    v                                           v
+---------------------------------------+   +---------------------------------------+
|  POST /api/pesapal-checkout           |   |   GET /api/pesapal-webhook            |
|                                       |   |   (Pesapal IPN Callback)              |
| - Payload validation & sanitization   |   |                                       |
| - Amount & currency bounds checking   |   | - Idempotent event deduplication      |
| - Merchant reference generation       |   | - Order tracking validation           |
| - Pesapal API 3.0 order registration  |   | - Amount verification & tamper guard  |
| - PaymentStore record initialization  |   | - State transition (COMPLETED/FAILED) |
+-------------------+-------------------+   +-------------------+-------------------+
                    |                                           |
                    +--------------------+----------------------+
                                         |
                                         v
                     +---------------------------------------+
                     |         lib/payment-store.ts          |
                     |                                       |
                     | - In-memory / persistent ledger       |
                     | - Strict State Machine:               |
                     |   PENDING -> COMPLETED                |
                     |   PENDING -> FAILED / REVERSED        |
                     | - Downgrade protection                |
                     +---------------------------------------+
                                         |
                                         v
                     +---------------------------------------+
                     |          Pesapal API 3.0              |
                     | - Sandbox / Production Gateway        |
                     | - Mobile Money & Card Rails           |
                     +---------------------------------------+
```

---

## 3. Core Modules & Subsystems

### 3.1 Payment Processing Engine (`lib/pesapal.ts`)
- **Authentication**: Exchanges `consumer_key` and `consumer_secret` for a Bearer token with expiration caching.
- **IPN Registration**: Registers a unique IPN callback URL (`register-ipn.mjs`) to receive transaction status updates asynchronously.
- **Order Submission**: Formats donor name, email, phone number, and UGX amount, returning a hosted checkout URL for the donor.

### 3.2 Idempotent Webhook Handler (`app/api/pesapal-webhook/route.ts`)
- **Idempotency**: Prevents duplicate webhook deliveries from triggering multiple status changes or downstream actions.
- **Downgrade Immunity**: Once a transaction is marked `COMPLETED`, subsequent callbacks cannot downgrade it to `PENDING` or `FAILED`.
- **Amount & Currency Validation**: Before marking a transaction `COMPLETED`, the handler verifies that the paid amount returned by Pesapal matches the expected amount recorded in the order.

### 3.3 State Machine (`lib/payment-store.ts`)
Valid states:
- `PENDING`: Order initialized, awaiting payment gateway confirmation.
- `COMPLETED`: Funds successfully captured and verified.
- `FAILED`: Payment rejected or cancelled.
- `REVERSED`: Chargeback or refund executed.
- `INVALID`: Signature, currency, or payload mismatch.

---

## 4. Verification and Security

- **13 Automated Unit Tests** (`scripts/test-unit.mjs`): Deterministically tests idempotency, state protection, amount tampering defense, timeout aborts, and malformed payload resilience.
- **Strict Content Security**: Zero external dependencies for payment store logic.
