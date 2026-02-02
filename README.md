# InvAnalytics - Inventory & Data Insights Platform

InvAnalytics is a full-stack Next.js application designed to provide businesses with a centralized platform for managing inventory and visualizing critical business data.

## 🚀 Features

- **Dynamic Dashboard:** Real-time visualization of stock levels, total inventory value, and low-stock alerts.
- **Inventory Management:** Complete system to track products, manage stock-in/stock-out transactions, and enforce unique SKUs.
- **Project Management:** Asana/Monday-style Kanban boards to manage business workflows and team tasks.
- **CRM & Suppliers:** Comprehensive modules to manage clients and vendors with cross-linked data.
- **Financial Suite:** Generate and track professional invoices and total revenue.
- **Audit Log:** Automated system-wide activity tracking for total operational transparency.
- **Document Management:** Attach and manage project-related files directly within the workflow.
- **BI Studio:** A dedicated intelligence hub for deep data exploration and cross-functional reporting.
- **Advanced Discovery:** Instant search by name/SKU and category-based filtering.
- **Data Export:** Generate and download CSV reports of your inventory data for external analysis.
- **Modern UI:** Built with Tailwind CSS and shadcn/ui for a clean, professional, and responsive experience.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** SQLite (managed via Prisma ORM)
- **Charts:** Recharts
- **Icons:** Lucide React

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd inventory-analytics-mvp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Database Setup:**
   Initialize your local SQLite database:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📈 Database Migration

This project uses Prisma, making it easy to switch from the local SQLite database to a production-ready PostgreSQL instance. Simply update the `provider` and `DATABASE_URL` in `prisma/schema.prisma` and run:

```bash
npx prisma db push
```

## 📄 Documentation

- **[Product Requirement Document (PRD)](./PRD.md):** Detailed project scope and technical specifications.

---
Created as an MVP for data-driven business management.