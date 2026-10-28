# Byte Tech BD — Bangladesh Leading Computer & Laptop E-Commerce Platform

A production-grade, full-stack e-commerce web application engineered specifically for the Bangladeshi technology retail market. Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL, Auth & Storage)**.

---

## 🚀 Live Features & Capabilities

### 1. Customer Storefront
- **Modern Responsive Design**: Dark navy, white, and teal theme with high-contrast accessibility across mobile, tablet, and desktop devices.
- **Dynamic Category Navigation**:
  - Brand New Laptops (with official distributor warranty)
  - Certified Pre-Owned & Used Laptops (with cosmetic condition grades A+/A/B+, battery health % diagnostics, and disclosed defects)
  - Desktop Workstations & Custom PC Builds
  - High-FPS Gaming PCs & Laptops
  - PC Components (CPUs, Motherboards, GPUs, RAM, NVMe SSDs, PSUs)
  - Accessories (Ergonomic mice, mechanical keyboards, backpacks)
- **Advanced Product Filtering**:
  - Live search across product names, descriptions, and SKUs
  - Filter by Category, Brand, Condition (New/Used/Refurbished)
  - Price range in Bangladeshi Taka (৳ BDT)
  - Sorting by Newest, Price Low-High, Price High-Low, Most Popular, and Name
- **Product Details & Transparency**:
  - Multi-image gallery with image previews
  - 30-Point Diagnostic Transparency report for used machines
  - Technical hardware specifications matrix
  - Real-time stock status (In Stock / Low Stock / Out of Stock)
  - Add to Cart with quantity stepper & instant "Buy Now" flow
- **Shopping Cart & Checkout**:
  - Persistent cart state using localStorage
  - Real-time delivery charge calculation:
    - **Inside Dhaka City**: ৳80 (24–48 Hours)
    - **Outside Dhaka (All 64 Districts)**: ৳150 (48–72 Hours)
    - **Free Delivery**: On orders of ৳10,000 or above
  - Promo code validation engine (percentage & fixed discount)
  - Validated Bangladeshi mobile number formatting (e.g., `017XXXXXXXX`)
  - **Cash on Delivery (COD)** with open-parcel inspection guarantee
  - Payment gateway architecture ready for **SSLCommerz** / bKash / Nagad
- **Order Tracking**:
  - Public order tracking using unique order numbers (e.g. `BTB-20261028-00001`)
  - Real-time step progress visual (Pending → Confirmed → Packaging → Out for Delivery → Delivered)
- **Customer Accounts**:
  - Customer registration & secure email/password authentication
  - Profile update and complete purchase history

### 2. Complete Admin Dashboard (`/admin`)
- **Role-Based Access Control**:
  - Protected by Supabase middleware; redirects non-admin users
  - Server-side role validation on all administrative server actions
- **Live Business Analytics**:
  - Total confirmed turnover in BDT (৳)
  - Total orders & pending fulfillment count
  - Active catalog count & low-stock warnings (under 5 units)
  - Recent orders quick-action table
- **Product Management (Full CRUD)**:
  - Add, edit, delete, publish, and draft products
  - Upload product photos to Supabase Storage
  - Manage stock quantities with automated inventory deduction on purchase and restoration on cancellation
  - Configure condition grades, testing notes, and warranty parameters
- **Order Fulfillment Pipeline**:
  - Filter orders by status: `Pending`, `Confirmed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`
  - Inline status transitions with automated timestamp recording
  - Modal inspection of ordered items, customer notes, and courier address
- **Category & Brand Management**:
  - Add and delete custom categories and hardware brands
- **Discount & Promotions Engine**:
  - Create coupon vouchers (Percentage or Fixed BDT discount, minimum spend rules)
- **Store Configuration**:
  - Configure Inside Dhaka and Outside Dhaka shipping fees
  - Configure free shipping threshold
  - Update hotline numbers, WhatsApp contact, and physical showroom address
- **Sales Reporting & Export**:
  - Filter orders by fulfillment period
  - Export full order history to spreadsheet-compatible **CSV**

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Actions, Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Type Checking)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with persistence
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Validation**: [Zod](https://zod.dev/)

---

## 📁 Project Directory Structure

```
byte-tech-bd/
├── public/                         # Static assets and public images
├── scripts/
│   └── create-admin.mjs            # CLI script for initial admin account setup
├── src/
│   ├── app/
│   │   ├── (auth)/                 # Login & Registration route group
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (storefront)/           # Customer storefront route group
│   │   │   ├── layout.tsx          # Storefront layout (Header + Footer)
│   │   │   ├── page.tsx            # Homepage (Hero, Categories, Featured)
│   │   │   ├── products/page.tsx   # All products catalog with filters
│   │   │   ├── product/[slug]/     # Product details with specs & diagnostics
│   │   │   ├── cart/page.tsx       # Shopping cart management
│   │   │   ├── checkout/page.tsx   # Checkout with BD districts & COD
│   │   │   ├── order-tracking/     # Real-time parcel tracking
│   │   │   ├── account/            # Customer profile & order history
│   │   │   ├── about/page.tsx      # About Byte Tech BD & 30-point check
│   │   │   ├── contact/page.tsx    # Outlet locations & quotation form
│   │   │   └── policies/           # Shipping, Returns, Privacy, Terms
│   │   ├── admin/                  # Protected Admin Dashboard
│   │   │   ├── layout.tsx          # Admin shell & sidebar navigation
│   │   │   ├── page.tsx            # Analytics overview & stats cards
│   │   │   ├── products/           # Product CRUD & inventory management
│   │   │   ├── orders/             # Order fulfillment pipeline
│   │   │   ├── categories/         # Category manager
│   │   │   ├── brands/             # Brand manager
│   │   │   ├── customers/          # Customer directory
│   │   │   ├── coupons/            # Promotional discount vouchers
│   │   │   ├── settings/           # Delivery rates & store settings
│   │   │   └── reports/            # Sales reporting & CSV export
│   │   ├── api/
│   │   │   ├── auth/signout/       # Sign out action handler
│   │   │   └── payment/sslcommerz/ # SSLCommerz IPN, success, and cancel routes
│   │   ├── globals.css             # Tailwind base & component utilities
│   │   └── layout.tsx              # Root HTML & toast provider
│   ├── components/
│   │   ├── ui/Logo.tsx             # Professional Byte Tech BD tech logo
│   │   └── storefront/             # Header, Footer, ProductCard, Filters, etc.
│   ├── hooks/
│   │   └── use-cart.ts             # Cart hook with persistence
│   ├── lib/
│   │   ├── actions/                # Next.js Server Actions (products, orders, auth, admin)
│   │   ├── supabase/               # Browser, server, and admin Supabase clients
│   │   ├── payments/sslcommerz.ts  # SSLCommerz gateway integration architecture
│   │   ├── constants.ts            # BD districts, navigation links, statuses
│   │   ├── demo-data.ts            # Realistic demo products & categories fallback
│   │   ├── types.ts                # TypeScript interfaces for all entities
│   │   └── utils.ts                # Price formatters, phone validators, helpers
│   └── middleware.ts               # Supabase session and route guard
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql  # Complete PostgreSQL schema with RLS & triggers
│   └── seed_data.sql               # Realistic Bangladeshi product seed data
├── .env.example                    # Environment variable template
├── next.config.mjs                 # Next.js configuration
├── tailwind.config.ts              # Custom navy/teal color palette
└── tsconfig.json                   # TypeScript compiler configuration
```

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- **Node.js**: v18.17.0 or later (v22.x recommended)
- **npm** or **pnpm**

### 2. Clone and Install Dependencies
```bash
git clone https://github.com/your-username/byte-tech-bd.git
cd byte-tech-bd
npm install
```

### 3. Environment Variables Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your configuration:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Setup Credentials (used by: npm run create-admin)
ADMIN_EMAIL=admin@bytetechbd.com
ADMIN_PASSWORD=YourSecurePassword123!

# SSLCommerz Payment Gateway (Optional)
SSLCOMMERZ_STORE_ID=
SSLCOMMERZ_STORE_PASSWORD=
SSLCOMMERZ_IS_SANDBOX=true

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🗄️ Database Setup & Migration

### Step 1: Run PostgreSQL Schema Migration
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open the **SQL Editor** from the left navigation.
3. Open `supabase/migrations/001_initial_schema.sql` from this repository.
4. Paste the entire SQL script and click **Run**.
   - This creates tables: `profiles`, `categories`, `brands`, `products`, `product_images`, `product_specifications`, `addresses`, `orders`, `order_items`, `coupons`, `banners`, `store_settings`.
   - Enables **Row Level Security (RLS)** and applies access policies.
   - Sets up automatic triggers for `updated_at`, automated user profile creation on signup, and formatted order numbers (`BTB-YYYYMMDD-XXXXX`).

### Step 2: Seed Demo Products & Brands
In the Supabase SQL Editor:
1. Paste the content of `supabase/seed_data.sql`.
2. Click **Run**.
   - This populates demo laptops (Dell, HP, Lenovo ThinkPad), gaming PCs, SSDs, and accessories.

### Step 3: Create Storage Bucket for Product Images
1. In the Supabase Dashboard, navigate to **Storage**.
2. Click **New Bucket**.
3. Name the bucket `product-images`.
4. Toggle **Public bucket** to `ON`.
5. Save the bucket.

---

## 🔐 Secure Initial Admin Setup

Byte Tech BD does **not** expose a public admin registration form on the storefront to prevent unauthorized privilege escalation.

To create the initial store administrator:
```bash
npm run create-admin
```
This script securely calls the Supabase Admin Auth API using your `SUPABASE_SERVICE_ROLE_KEY`, provisions the administrator user, and sets their role to `'admin'` in the `profiles` table.

You can then log in at:
**`http://localhost:3000/login`** using your admin credentials, which grants immediate access to the `/admin` portal.

---

## 💻 Running the Application

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Type Checking & Linting
```bash
npm run type-check
npm run lint
```

### Production Build
```bash
npm run build
npm run start
```

---

## 💳 Payment Gateway Integration (SSLCommerz)

Byte Tech BD includes a complete server-side payment processing architecture for **SSLCommerz**:
- **Offline / Sandbox**: By default, `Cash on Delivery (COD)` is enabled and active for all 64 districts in Bangladesh.
- **Enabling Live SSLCommerz Gateway**:
  1. Register for an account with [SSLCommerz](https://sslcommerz.com/).
  2. Set `SSLCOMMERZ_STORE_ID` and `SSLCOMMERZ_STORE_PASSWORD` in your `.env.local`.
  3. Set `SSLCOMMERZ_IS_SANDBOX=false` for production transactions.
  4. The webhook and callback endpoints in `src/app/api/payment/sslcommerz/` will automatically validate transaction hash signatures (`val_id`) and update order status to `paid` and `confirmed`.

---

## 🚢 Production Deployment

The project is optimized for deployment on **Vercel**:
1. Push your repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com/).
3. Add the environment variables from `.env.local` into the Vercel project settings.
4. Deploy! Next.js App Router will generate optimized static pages and server action routes automatically.

---

© 2026 **Byte Tech BD**. All rights reserved.
