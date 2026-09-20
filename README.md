# Ellee Collections
> Trendy. Affordable. Always You.

## 📖 About
Ellee Collections is a modern e-commerce platform that curates and offers quality, affordable items. Designed with simplicity and elegance in mind, it provides a seamless shopping experience allowing customers to discover pieces that speak to their style and enjoy a frictionless guest checkout delivered straight to their doorstep.

## ✨ How It Works
- **Seamless Guest Checkout**: Customers can quickly and easily purchase items without the hassle of mandatory account creation.
- **Curated Catalog**: Users can browse and explore a curated selection of high-quality items.
- **Lightning Fast Search**: Integrated search allows users to find exactly what they're looking for instantly.
- **Admin Dashboard**: A secure, comprehensive management interface for administrators to track sales, manage inventory, and view analytics.
- **Responsive Design**: Beautiful and functional across all devices, ensuring a premium shopping experience on mobile, tablet, and desktop.

## 🛠️ Tech Stack
This project is built using modern web technologies to ensure performance, scalability, and a great developer experience.

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (App Router, v16)
- **Library**: [React](https://react.dev/) (v19)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) (v4)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

### Backend & Database
- **BaaS**: [Supabase](https://supabase.com/) (Authentication, PostgreSQL Database, and Storage)
- **Integration**: `@supabase/ssr` & `@supabase/supabase-js`

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm
- A Supabase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ellee
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the `frontend` directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the store in action.

## 📁 Project Structure
```text
ellee/
├── frontend/             # Main Next.js application
│   ├── src/
│   │   ├── app/          # Next.js App Router (pages, layouts)
│   │   │   ├── (admin)/  # Admin dashboard routes
│   │   │   └── ...       # Public routes (about, contact, etc.)
│   │   ├── components/   # Reusable UI components
│   │   ├── lib/          # Utility functions and Supabase client setup
│   │   ├── store/        # Zustand state management hooks
│   │   └── utils/        # Helper functions
│   └── public/           # Static assets
└── README.md
```

## 📄 License
This project is licensed under the terms of the LICENSE file included in the repository.