# Product Requirement Document (PRD): InvAnalytics

## 1. Executive Summary
InvAnalytics is a full-stack MVP designed to solve data management and inventory pain points for small to medium-sized businesses. It provides a centralized dashboard for real-time stock tracking and data visualization, enabling data-driven decision-making.

## 2. Project Vision
To provide a lightweight, scalable, and intuitive platform that bridges the gap between simple spreadsheets and complex enterprise resource planning (ERP) systems.

## 3. Target Audience
- E-commerce shop managers.
- Small warehouse operators.
- Startup founders needing a prototype for data ingestion and visualization.

## 4. Tech Stack
- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS.
- **UI Components:** shadcn/ui (Radix UI), Lucide Icons.
- **Database:** SQLite (Development/MVP), Prisma ORM (Scalable to PostgreSQL).
- **Analytics:** Recharts (Data Visualization).

## 5. Functional Requirements

### 5.1 Dashboard & Analytics
- **Summary Cards:** Display Total Items, Total Inventory Value, and Low Stock Alerts.
- **Data Visualization:** Bar charts showing stock distribution across different product categories.
- **Real-time Updates:** Statistics refresh automatically upon data modification.

### 5.2 Inventory Management
- **Product Listing:** View all items with details (Name, SKU, Category, Price, Quantity).
- **CRUD Operations:** Ability to add new products via a modal form.
- **Stock Control:** Dedicated "Stock-In" and "Stock-Out" actions to update quantities without editing the entire product profile.
- **Validation:** Unique SKU enforcement to prevent duplicate data entry.

### 5.3 Data Discovery & Reporting
- **Search:** Instant global search by Product Name or SKU.
- **Filtering:** Narrow down inventory views by specific product categories.
- **Exporting:** Download filtered inventory data as a CSV file for external reporting or auditing.

## 6. User Interface (UX/UI)
- **Design System:** Professional "Slate" theme with high-contrast typography.
- **Navigation:** Persistent sidebar for seamless switching between Dashboard and Inventory modules.
- **Responsiveness:** Fully functional on Desktop and Tablet devices.
- **Low-Stock Visibility:** Visual indicators (red highlights) for items requiring immediate attention.

## 7. Roadmap (Future Enhancements)
- **Authentication:** Implementation of NextAuth.js for secure user sessions.
- **PostgreSQL Migration:** Move from SQLite to a production-grade database.
- **Supplier Tracking:** Associate inventory items with specific vendors.
- **Activity Logs:** A detailed history of every stock transaction (Audit Trail).

---
*Created on: February 1, 2026*
