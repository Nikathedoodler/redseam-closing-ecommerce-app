# 🛍️ RedSeam Clothing - E-commerce Application

A modern, responsive e-commerce platform built with Next.js 15, featuring a complete shopping experience from product browsing to checkout.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC)
![React Query](https://img.shields.io/badge/TanStack_Query-5-FF4154)

## 🚀 Live Demo

[View Live Demo](https://your-demo-link.vercel.app) <!-- Replace with your actual deployment link -->

## ✨ Features

### 🛒 **Shopping Experience**

- **Product Catalog** - Browse products with pagination, filtering, and sorting
- **Product Details** - Interactive product pages with image galleries, size/color selection
- **Shopping Cart** - Persistent cart with quantity controls and real-time updates
- **Checkout Flow** - Complete order processing with form validation

### 🔐 **Authentication**

- **User Registration** - Secure account creation with validation
- **Login System** - Token-based authentication with persistent sessions
- **Protected Routes** - Authentication-aware navigation

### 🎨 **User Interface**

- **Responsive Design** - Optimized for all device sizes (mobile, tablet, desktop)
- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Loading States** - Skeleton loaders and loading indicators
- **Error Handling** - User-friendly error messages and validation

### ⚡ **Performance**

- **Server-Side Rendering** - Fast initial page loads with Next.js SSR
- **Data Caching** - Intelligent caching with TanStack Query
- **Image Optimization** - Optimized product images for fast loading
- **Prefetching** - Smart prefetching for seamless navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form
- **Icons**: Custom SVG components
- **Fonts**: Google Fonts (Poppins)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── products/          # Product listing and details
│   ├── checkout/          # Checkout flow
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── context/           # React Context providers
│   ├── icons/             # Custom SVG icons
│   └── ui/                # UI components
└── lib/                   # Utility functions and API
    └── api/               # API integration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/redseam-ecommerce.git
   cd redseam-ecommerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Key Features Explained

### **Smart Pagination**

- Implements ellipsis-based pagination for large product catalogs
- Prefetches next page for seamless navigation

### **Hydration-Safe Patterns**

- Prevents SSR/client-side rendering mismatches
- Ensures consistent UI across all environments

### **Context-Based State Management**

- Centralized authentication state with AuthContext
- Persistent shopping cart with CartContext
- Automatic UI updates when state changes

### **Responsive Design**

- Mobile-first approach with Tailwind CSS
- Optimized layouts for all screen sizes
- Touch-friendly interactions

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

## 📱 Screenshots

<!-- Add screenshots of your application -->

![Product Listing](screenshots/products.png)
![Product Details](screenshots/product-detail.png)
![Shopping Cart](screenshots/cart.png)
![Checkout](screenshots/checkout.png)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [TanStack Query](https://tanstack.com/query) for data fetching
- [Vercel](https://vercel.com/) for deployment platform

---

⭐ **If you found this project helpful, please give it a star!**
