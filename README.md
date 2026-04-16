# 🌿 Nuna Organics (Renu's Natural Haven)

A premium, high-performance E-commerce platform for botanical skincare and natural wellness products. Built with a focus on cinematic aesthetics, robust security, and seamless user experience.

---

## ✨ Key Features

### 🎨 Premium User Experience
- **Cinematic Preloader**: A high-end, artistic loading animation with shutter reveals and shimmer effects.
- **Responsive Boutique Shop**: Fully responsive design with category filtering (Essential Oils, Skincare, Haircare, etc.).
- **Interactive Product Details**: Deep-dive into botanical ingredients, usage guides, and beautiful imagery.
- **Glassmorphic Cart**: A modern, slide-out shopping bag with real-time total calculation and quantity management.

### 🔐 Secure Authentication & User Flow
- **Unified Auth System**: Support for traditional Email/Password and one-click **Google OAuth**.
- **Protected Purchase Flow**: Mandatory sign-in before checkout to ensure every order is tracked and notified correctly.
- **Personal Dashboard**: Users can view their order history and manage their botanical profile.

### 💸 Fast & Flexible Payments
- **Stripe Integration**: Secure global checkout for credit/debit cards.
- **Google Pay**: Native integration for quick browser-based payments.
- **Direct UPI App Checkout**: Optimized for the Indian market; allows users to pay directly via their preferred UPI app (PhonePe, GPay, PayTM) without extra fees.

### 📧 Automated Notification System
- **Dual-Layer Email Service**: Robust delivery system using **Resend** as primary and auto-switching to **Gmail SMTP** as a fallback.
- **Purchase Confirmations**: Beautifully designed HTML emails sent immediately after a successful order.
- **Abandoned Cart Recovery**: An automated hourly cron job that identifies left-behind items and sends friendly email reminders with discount offers.

### 🛡️ Production-Grade Security
- **Rate Limiting**: Protects against DDoS and brute-force attacks (100 reqs/15 mins).
- **Security Headers**: Standard headers secured via `Helmet`.
- **Payload Protection**: Strict JSON body limits and HTTP Parameter Pollution (HPP) mitigation.
- **Safe Error Handling**: Detailed logs for developers while showing user-friendly generic messages to potential attackers in production.

---

## 🛠️ Technology Stack

| Layer          | Technology                                     |
|----------------|------------------------------------------------|
| **Frontend**   | React + Vite + TypeScript                      |
| **Styling**    | Tailwind CSS + Lucide Icons + Framer Motion    |
| **Backend**    | Node.js + Express.js                           |
| **Database**   | Supabase (PostgreSQL)                          |
| **Payments**   | Stripe + Web UPI + Google Pay SDK              |
| **Email**      | Resend + Nodemailer (Gmail)                    |
| **Analytics**  | Vercel Analytics                               |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Supabase account (for database)
- Resend / Gmail App Password (for mail)

### Installation
1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd renu-s-natural-haven
   ```

2. **Frontend Setup**:
   ```bash
   npm install
   npm run dev
   ```

3. **Backend Setup**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

---

## 📈 Monitoring & Scalability
- **Vercel Analytics**: Built-in tracking for user events and performance.
- **Performance Caching**: Edge caching headers implemented for product data to ensure lightning-fast load times globally.
- **Modular Routes**: Easy to expand with new botanical categories or administrative features.

---

## 👩‍🌾 Founder's Vision
"Renu's Natural Haven is more than a shop; it's a digital sanctuary for those seeking the purest forms of nature's care. Every line of code is written to reflect the quality of our botanical extracts."

---
*Developed with ❤️ for Nuna Organics*
