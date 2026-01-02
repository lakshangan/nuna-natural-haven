# 🚀 Supabase Backend Setup Guide

To make your database work, follow these simple steps:

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **"New Project"**.
3. Name it `Renu Anni` (or whatever you like).
4. Save your **Database Password** somewhere safe!

### 2. Get your API Keys
1. Once the project is ready, go to **Project Settings** -> **API**.
2. Copy the **Project URL**.
3. Copy the **anon public** Key.
4. Create a file named `.env` in your project root and paste them like this:
   ```env
   VITE_SUPABASE_URL=your_project_url_here
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### 3. Create the Database Schema
Go to the **SQL Editor** tab in Supabase and run this script. 

**Note:** This script will delete existing tables and recreate them. If you want to keep your data, remove the `DROP TABLE` lines.

```sql
-- 0. CLEANUP (Optional: Run this to restart from scratch)
drop table if exists order_items cascade;
drop table if exists orders cascade;
drop table if exists products cascade;
drop table if exists profiles cascade;

-- 1. PRODUCTS TABLE
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  price decimal not null,
  category text,
  ingredients text,
  image_url text,
  stock_quantity integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PROFILES TABLE (Linked to Supabase Auth)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  address text,
  phone text,
  updated_at timestamp with time zone
);

-- 3. ORDERS TABLE
create table orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  status text default 'pending', -- pending, paid, shipped, delivered
  total_amount decimal not null,
  shipping_address text,
  stripe_payment_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. ORDER ITEMS (The specific products in an order)
create table order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders on delete cascade not null,
  product_id uuid references products not null,
  quantity integer not null,
  price_at_purchase decimal not null
);

-- 5. INSERT SAMPLE PRODUCTS
insert into products (name, slug, description, price, category, ingredients, image_url)
values 
('Nourishing Hair Oil', 'nourishing-hair-oil', 'Deep conditioning treatment for all hair types', 32, 'Hair Care', 'Rosemary, Lavender, Jojoba', '/product-1.jpg'),
('Soothing Face Cream', 'soothing-face-cream', 'Gentle hydration for sensitive skin', 42, 'Skin Care', 'Chamomile, Calendula, Shea Butter', '/product-2.jpg'),
('Healing Body Butter', 'healing-body-butter', 'Rich moisture for dry skin', 38, 'Body Care', 'Eucalyptus, Rosemary, Cocoa Butter', '/product-3.jpg');

-- 6. SECURITY POLICIES (RLS)
-- Enable RLS on all tables
alter table products enable row level security;
alter table profiles enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Policies
create policy "Anyone can view products" on products for select using (true);
create policy "Users can view their own profiles" on profiles for select using (auth.uid() = id);
create policy "Users can update their own profiles" on profiles for update using (auth.uid() = id);
create policy "Users can view their own orders" on orders for select using (auth.uid() = user_id);
create policy "Users can insert their own orders" on orders for insert with check (auth.uid() = user_id);
```

---

### 🎓 Teaching Point: Row Level Security (RLS)
This is the most important part of Supabase. In a normal database, if a hacker gets your API key, they can see everyone's orders.
With **RLS**, we tell the database: *"Only let a user see an order if the `user_id` matches their own ID."* 
It’s like having a digital lock on every individual row of your data.

---

### Why are we doing this?
By moving data to Supabase, you can later add an **Admin Dashboard** where you can add new products simply by filling out a form, without touching a single line of code!
