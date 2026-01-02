# 💳 Stripe Payment Setup Guide

To accept real payments, follow these steps:

### 1. Create a Stripe Account
1. Sign up at [stripe.com](https://stripe.com).
2. You don't need to "activate" your account to start testing.

### 2. Get your API Keys
1. Go to your **Developers** dashboard -> **API Keys**.
2. Copy the **Publishable Key** (starts with `pk_test_`).
3. Add it to your `.env` file:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=your_pk_test_key_here
   ```

### 3. How Checkout Works
Since this is a Vite (frontend-only) project, the easiest way to handle payments without a custom server is to use **Stripe Checkout Client-only mode** or **Supabase Functions**.

However, for maximum security and ease of learning, the best approach is to use **Stripe Payment Links**.

#### Option A: Stripe Payment Links (Easiest)
1. Go to **Payments** -> **Payment Links** in Stripe.
2. Create a link for each product.
3. Paste the links into your Supabase `products` table in a new `stripe_link` column.

#### Option B: Stripe Checkout (Professional)
I have prepared the code to handle real checkout sessions. You will eventually need a small "Edge Function" (a tiny bit of server code) to create the checkout session securely.

---

### What's Next?
Once you have these keys, I will help you connect the "Proceed to Checkout" button to a real Stripe payment page!
