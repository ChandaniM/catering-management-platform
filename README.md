# Saffron & Sage - Premium Catering Platform

## 🎯 What is This?

A **premium luxury catering platform** built with microfrontend architecture for a pure vegetarian catering company based in Mumbai, serving clients PAN India.

This platform consists of:
- **User-facing website**: Browse services, gallery, company information, and submit catering inquiries
- **Admin dashboard**: Manage customer inquiries and business operations
- **Backend API**: Centralized data management with secure authentication

**Design Philosophy:** Luxurious, Modern, Elegant, Minimal but rich, Trustworthy, Premium hospitality-focused, Ultra polished, Pixel-perfect, Smooth & immersive, Responsive on every device.

---

## 🚀 How to Run the Application

### Prerequisites
- Node.js 20+ installed
- npm or yarn package manager

### Step 1: Start the Backend

```bash
cd micro/backend

# Install dependencies
npm install

# Start development server
npm run start:dev
```

**Backend runs on:** `http://localhost:4000`

---

### Step 2: Start the User Website

Open a **new terminal** and run:

```bash
cd micro/frontend/user-site

# Install dependencies
npm install

# Start development server
npm run dev
```

**User website runs on:** `http://localhost:5173`

---

### Step 3: Start the Admin Dashboard

Open a **new terminal** and run:

```bash
cd micro/frontend/admin

# Install dependencies
npm install

# Start development server
npm run dev -- --port 5174
```

**Admin dashboard runs on:** `http://localhost:5174`

---

## 📱 Using the Application

### User Website (`http://localhost:5173`)
Browse the public-facing catering website:
- **Home**: Premium landing page showcasing the brand
- **Services**: Detailed catering service offerings
- **Gallery**: Visual showcase of past events
- **About**: Company story and values
- **Contact**: Submit catering inquiries with event details

### Admin Dashboard (`http://localhost:5174`)
Manage business operations:
- **Dashboard**: Overview statistics
- **Inquiries**: View and manage customer inquiries
- Additional management features (services, gallery, content)

---

## ✨ Features

### User Site
- Premium luxury homepage with elegant design
- Services page with detailed catering offerings
- Gallery page with event photos
- About page with company information
- Contact form for catering inquiries
- WhatsApp integration for direct communication
- Fully responsive across all devices

### Admin Dashboard
- Secure authentication system
- Dashboard with business statistics
- Customer inquiry management (view, delete)
- Clean, professional interface
- Real-time data updates

### Backend
- RESTful API built with NestJS
- SQLite database (zero configuration required)
- JWT-based secure authentication
- Data validation on all endpoints
- CORS enabled for frontend applications

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite 8
- **Routing:** React Router DOM v7
- **Styling:** Custom CSS with premium design system
- **Typography:** Playfair Display, Inter

### Backend
- **Framework:** NestJS 10
- **Language:** TypeScript
- **Database:** SQLite with Prisma ORM
- **Authentication:** JWT tokens

---

## 📁 Project Structure

```
micro/
├── frontend/
│   ├── user-site/      # Public website (React + Vite)
│   └── admin/          # Admin dashboard (React + Vite)
└── backend/            # NestJS API with SQLite database
```

---

## 💡 Important Notes

- **All three applications must be running simultaneously** for full functionality
- **Start the backend first** before launching the frontends
- The database is **SQLite file-based** (no additional database setup required)
- Check terminal/console logs if you encounter any errors
- Use browser DevTools to inspect network requests and debug issues

---

## 🔧 Development Scripts

### Backend
```bash
npm run start:dev    # Development mode with hot reload
npm run build        # Build for production
npm run start        # Production mode
```

### Frontend (Both User Site & Admin)
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
```

---

## 🎨 Design System

### Color Palette
- **Primary:** `#1A1520` (Deep plum)
- **Gold:** `#C4A46C` (Premium gold)
- **Cream:** `#FAF8F5` (Soft cream)
- **White:** `#FFFFFF`

### Typography
- **Headings:** Playfair Display (serif)
- **Body Text:** Inter (sans-serif)

