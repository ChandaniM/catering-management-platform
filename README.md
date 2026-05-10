# Saffron & Sage - Premium Catering Platform

## 🎯 Project Overview

A **world-class premium luxury catering platform** built with microfrontend architecture for a pure vegetarian catering company based in Mumbai, serving clients PAN India.

**Design Philosophy:** Luxurious, Modern, Elegant, Minimal but rich, Trustworthy, Premium hospitality-focused, Ultra polished, Pixel-perfect, Smooth & immersive, Responsive on every device.

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

## 🚀 Tech Stack

### Frontend (Both Apps)
- **Framework:** React 19
- **Build Tool:** Vite 8
- **Routing:** React Router DOM v7
- **HTTP Client:** Axios
- **Styling:** Custom CSS with premium design system
- **Typography:** Playfair Display, Inter

### Backend
- **Framework:** NestJS 10
- **Language:** TypeScript
- **Database:** SQLite (file-based, zero setup)
- **ORM:** Prisma 5
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** class-validator, class-transformer

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js 20+ installed
- npm or yarn package manager

### 1. Backend Setup

```bash
cd micro/backend

# Install dependencies
npm install

# Database is already set up (SQLite file-based)
# If you need to reset: npx prisma migrate reset

# Start development server
npm run start:dev
```

**Backend will run on:** `http://localhost:4000`

**API Endpoints:**
- `GET /api/health` - Health check
- `POST /api/auth/login` - Admin login
- `GET /api/inquiries` - Get all inquiries
- `POST /api/inquiries` - Create inquiry
- `DELETE /api/inquiries/:id` - Delete inquiry

### 2. User Site Setup

```bash
cd micro/frontend/user-site

# Install dependencies
npm install

# Start development server
npm run dev
```

**User Site will run on:** `http://localhost:5173`

**Pages:**
- `/` - Home
- `/services` - Services
- `/gallery` - Gallery
- `/about` - About
- `/contact` - Contact

### 3. Admin Dashboard Setup

```bash
cd micro/frontend/admin

# Install dependencies
npm install

# Start development server (on port 5174)
npm run dev -- --port 5174
```

**Admin Dashboard will run on:** `http://localhost:5174`

**Default Admin Credentials:**
- Email: `admin@saffron-sage.com`
- Password: `admin123`

---

## 🔑 Admin Login

1. Navigate to `http://localhost:5174`
2. Login with default credentials
3. Access dashboard to manage:
   - 📊 Overview stats
   - 📝 Customer inquiries
   - 🎊 Services (placeholder)
   - 🖼️ Gallery (placeholder)
   - 📄 Content (placeholder)

---

## 📊 Database Schema

```prisma
model Admin {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String   (bcrypt hashed)
  createdAt DateTime @default(now())
}

model Inquiry {
  id         Int      @id @default(autoincrement())
  name       String
  email      String
  phone      String
  eventType  String   (wedding, corporate, birthday, etc.)
  eventDate  String?
  guestCount String?
  message    String?
  status     String   @default("pending")
  createdAt  DateTime @default(now())
}

model Service {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  features    String   (JSON string)
  capacity    String?
  active      Boolean  @default(true)
}

model GalleryImage {
  id       Int      @id @default(autoincrement())
  url      String
  title    String?
  category String?
  active   Boolean  @default(true)
}
```

---

## 🎨 Design System

### Colors
- **Primary:** `#1A1520` (Deep plum)
- **Gold:** `#C4A46C` (Premium gold)
- **Cream:** `#FAF8F5` (Soft cream)
- **White:** `#FFFFFF`

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

### Spacing
- Minimum padding: **8px** on all clickable elements
- Section padding: **4rem** (64px)
- Container max-width: **1280px**

---

## 🔒 Security Features

- JWT-based authentication with 15-minute token expiry
- Bcrypt password hashing (cost factor: 12)
- CORS configured for frontend origins
- Input validation on all API endpoints
- Secure admin-only routes

---

## 🌐 API Integration

**Contact Form → Backend:**

```typescript
// User submits inquiry on /contact page
const response = await axios.post('http://localhost:4000/api/inquiries', {
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 9999999999",
  eventType: "wedding",
  eventDate: "2026-06-15",
  guestCount: "500",
  message: "Looking for premium catering..."
});
```

**Admin Dashboard → Backend:**

```typescript
// Admin views inquiries
const token = localStorage.getItem('adminToken');
const response = await axios.get('http://localhost:4000/api/inquiries', {
  headers: { Authorization: `Bearer ${token}` }
});
```

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=4000
NODE_ENV=development

# Database
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="change-this-in-production-32-chars-min"
JWT_EXPIRES_IN="15m"
REFRESH_SECRET="change-this-refresh-secret-32-chars"
REFRESH_EXPIRES_IN="7d"

# Admin
ADMIN_EMAIL="admin@saffron-sage.com"
ADMIN_PASSWORD_HASH="$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxKTKqK3i"
# Default password: admin123
```

---

## ✅ Features Implemented

### User Site
- ✅ Premium luxury homepage
- ✅ Services page with detailed offerings
- ✅ Gallery page with image grid
- ✅ About page with company story
- ✅ Contact page with inquiry form
- ✅ React Router navigation
- ✅ Responsive design
- ✅ Premium design system
- ✅ WhatsApp integration

### Admin Dashboard
- ✅ Secure login page
- ✅ Dashboard overview with stats
- ✅ Inquiries management (view, delete)
- ✅ Sidebar navigation
- ✅ Clean white background UI
- ✅ Premium aesthetic matching brand
- ✅ Real-time data from backend

### Backend
- ✅ NestJS RESTful API
- ✅ SQLite database with Prisma
- ✅ JWT authentication
- ✅ CORS enabled for frontends
- ✅ Global validation pipe
- ✅ Inquiries CRUD operations
- ✅ Health check endpoint

---

## 🚧 Pending Features (Future Enhancements)

1. **Image Upload** for gallery management
2. **Service Management** UI in admin
3. **Email Notifications** on inquiry submission
4. **WhatsApp API Integration**
5. **Testimonials Management**
6. **Blog CMS**
7. **Analytics Dashboard**
8. **Staff Management** module
9. **Real-time Updates** with WebSockets
10. **Production PostgreSQL** migration

---

## 🔧 Development Scripts

### Backend
```bash
npm run start        # Production
npm run start:dev    # Development (watch mode)
npm run build        # Build for production
```

### Frontend (Both)
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
```

---

## 📱 How to Use

### For End Users:
1. Visit `http://localhost:5173`
2. Browse services, gallery, about
3. Fill contact form to submit inquiry
4. Inquiry is saved to database
5. Receive confirmation message

### For Admins:
1. Visit `http://localhost:5174`
2. Login with credentials
3. View dashboard overview
4. Manage inquiries (view, delete)
5. Access other management sections

---

## 🎯 Success Criteria

- ✅ Pixel-perfect spacing (minimum 8px padding on all clickable elements)
- ✅ Premium luxury aesthetic throughout
- ✅ Fully responsive on all devices
- ✅ Working API integration
- ✅ Secure authentication
- ✅ Clean white background in admin
- ✅ Professional UI matching brand identity
- ✅ All pages functional and routed

---

## 🏗️ Architecture Benefits

**Microfrontend Approach:**
- Independent deployment of user-site and admin
- Separate codebases for clarity
- Different styling requirements met easily
- Scalable for future features

**Backend API:**
- Centralized business logic
- Single source of truth for data
- Easy to extend with new endpoints
- Type-safe with TypeScript

---

## 🎓 For Production

1. **Change all secrets** in `.env`
2. **Migrate to PostgreSQL** for production
3. **Deploy backend** to cloud (AWS, Render, Railway)
4. **Deploy frontends** to CDN (Vercel, Netlify)
5. **Set up CI/CD** pipeline
6. **Configure domain** and SSL
7. **Add monitoring** and error tracking

---

## 💡 Tips

- All three apps must be running simultaneously
- Backend must start first for frontends to connect
- Check console logs for any errors
- Use browser DevTools to inspect API calls
- Database file is at `backend/prisma/dev.db`

---

## 📞 Support

For any issues or questions, refer to:
- Backend logs: Check terminal output
- Frontend logs: Check browser console
- Database: Use `npx prisma studio` to inspect data

---

**Built with ❤️ for premium catering excellence**
