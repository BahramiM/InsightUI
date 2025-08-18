# InsightUI – Modern Front-End Dashboard Powered by Supabase (BaaS)

**InsightUI** is a modern, full-featured front-end dashboard template built using **Next.js (App Router)**, **Tailwind CSS**, and **Supabase**.

This project is designed to demonstrate how to build a fully functional web application using **Backend-as-a-Service** technologies — without writing a traditional backend.

It serves as both a **starter kit** for modern dashboards and a **showcase** of how front-end developers can independently build secure, scalable apps using tools like Supabase, React Server Components, and TailwindCSS.

![screenshot](./screenshot.png)

---

## 🚀 Why InsightUI?

- 🧠 Built with **role-based logic** (Admin / User / Guest) out of the box
- ⚙️ Powered by **Supabase Auth**, Database, and Storage
- 📦 No custom backend – 100% frontend logic + BaaS
- 🎯 Ideal for learning, prototyping, or production dashboards
- 📈 Designed to be **performance-first** and Core Web Vitals-friendly

---

## 🔧 Tech Stack

| Tech               | Purpose                                                |
| ------------------ | ------------------------------------------------------ |
| **Next.js 14**     | Frontend framework with App Router & Server Components |
| **Supabase**       | Auth, database (Postgres), and file storage            |
| **Tailwind CSS**   | Utility-first styling                                  |
| **shadcn/ui**      | Prebuilt accessible components                         |
| **TypeScript**     | Type safety across the app                             |
| **React Context**  | Lightweight state management for auth and UI           |
| **Server Actions** | Form handling and DB integration without client code   |
| **Vercel**         | Fast and easy deployment                               |

---

## ✨ Features

- 🔐 Authentication with Supabase (sign up / sign in / sign out)
- 👤 Role-based access control (RLS in Supabase + route-level checks)
- 🧩 Modular and dynamic dashboard layout
- 💾 File upload (via Supabase Storage)
- 🌐 SEO-ready, accessible and responsive UI
- 🧪 Modern architecture (app router, RSC, server actions)
- 🎨 Reusable UI components with **CVA** + **tailwind-variants**
- 🚀 Ready to deploy on Vercel

---

## 📁 Project Structure

.
├── app/ # Next.js app router structure
│ ├── (public)/ # Public-facing pages
│ ├── (admin)/ # Admin-only layout & pages
│ ├── layout.tsx # Global layout with provider setup
├── components/ # UI components (buttons, inputs, etc.)
├── hooks/ # Custom hooks
├── lib/ # Utility and supabase client
├── types/ # Shared TypeScript types
├── styles/ # Tailwind config, globals
├── public/ # Static assets
└── ...

---

## 🛠 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/BahramiM/insightui.git
cd insightui

# 2. Install dependencies
pnpm install

# 3. Add your Supabase credentials to .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 4. Run the development server
pnpm dev
```
