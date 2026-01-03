# 🔍 Backend Deep Dive: Architecture & File Breakdown

This report provides a granular explanation of the core backend directories: `config`, `controllers`, and `routes`.

---

## 🛠️ 1. The Configuration Layer (`/config`)
*This directory handles the "DNA" of the application—how it connects to external services and manages its own settings.*

### 📄 `db.js` (The Database Connector)
- **What it does**: This is the single source of truth for the database connection.
- **Logic**: It imports the `createClient` from `@supabase/supabase-js`, pulls the `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from your environment variables, and initializes the `supabase` object.
- **Why it’s important**: Every other file in the backend that needs to talk to the database imports the `supabase` client from here.

### 📄 `env.js` (The Secret Guardian)
- **What it does**: Centralizes all sensitive environment variables.
- **Logic**: Instead of calling `process.env.VAR_NAME` everywhere in the app (which is messy and error-prone), this file gathers them into a clean `ENV` object.
- **Variables handled**: Server `PORT`, Supabase credentials, `JWT_SECRET` for security, and `STRIPE_SECRET_KEY` for payments.

---

## 🧠 2. The Logic Layer (`/controllers`)
*This is where the "heavy lifting" happens. Controllers don't care about URLs; they only care about data logic.*

### 📄 `product.controller.js` (The Inventory Brain)
- **getProducts**: Fetches every item from the `products` table in Supabase.
- **getProductBySlug**: Finds a specific product using its "slug" (e.g., `lavender-mist`) rather than a random ID, which is better for SEO.
- **Admin Actions**: Contains `createProduct`, `updateProduct`, and `deleteProduct`. These functions take data from the frontend and update the database accordingly.

### 📄 `admin.controller.js` (The Control Room Brain)
- **adminGoogleLogin**: This is a security-heavy function. It takes a Google ID token from the frontend, verifies it with Google's servers, checks if the email is on the "Admin List", and if so, issues a secure JWT token.
- **getAdminStats**: This is the "Engine" for the Dashboard. It calculates total revenue, total users, and total products in one go to provide the stats you see when you log in as admin.
- **Data Fetchers**: `getAllOrders` and `getAllCustomers` provide the raw lists needed for the admin tables.

### 📄 `order.controller.js` & `auth.controller.js`
- **Status**: Currently placeholders.
- **Note**: The shop's order logic is currently handled directly in the routes for faster processing, but these files are ready to house more complex logic as the app grows.

---

## 🚥 3. The Navigation Layer (`/routes`)
*Routes define the URLs that the frontend can talk to. They act as "entry gates" to the controllers.*

### 📄 `product.routes.js` (The Shop Gates)
- **Public Access**: Defines paths where anyone can see products (`GET /`).
- **Restricted Access**: Uses `adminProtect` middleware on `POST`, `PUT`, and `DELETE` routes. This ensures that even if someone finds the URL, they can't change your prices or delete products without an admin key.

### 📄 `admin.routes.js` (The Staff Entrance)
- **Login**: Manages the `/auth/google` route for staff sign-in.
- **Dashboard Data**: Defines the paths for `/stats`, `/orders`, and `/customers`. Note that **all** of these are wrapped in `adminProtect` for maximum security.

### 📄 `order.routes.js` (The Transaction Gate)
- **Checkout Logic**: This is a high-importance route. When a user hits `/checkout`, this route:
    1. Saves the order details into Supabase (status `pending`).
    2. Triggers an automated email via the `email.service.js`.
    3. Returns a success URL to the frontend.
- **Test Route**: Includes a `/test-email` path to verify that the email notification system is working correctly.

---

## 🔄 Summary of Flow
1. **Request** hits a **Route** (e.g., `GET /api/products`).
2. **Route** checks if you need permission (Middleware).
3. **Route** passes the job to a **Controller** (`product.controller.js`).
4. **Controller** asks the **Config** (`db.js`) to talk to the database.
5. **Controller** sends the data back to the User.
