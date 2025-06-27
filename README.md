# 🧱 TechShop – E‑commerce Project Blueprint

## 📋 Project Overview

**Name:** TechShop  
**Type:** Fullstack E‑commerce Web App  
**Stack:** React • Tailwind • Node.js • Express • MySQL • Prisma • JWT • Vercel/Render/PlanetScale  

---

## ✨ Core Features

### 👥 User Features
- Sign up / Login / Logout  
- Browse products (search / filter)  
- View product details  
- Add / Remove from cart  
- Checkout with shipping address  
- Place an order  
- View order history  
- Update profile

### 🛠️ Admin Features
- Admin login  
- Product CRUD operations  
- View and update orders  
- View and manage users (ban/promote)

---

## 🔐 User Roles & Access

| Role | Description | Access Level |
|------|-------------|--------------|
| **Guest** | Not logged in | Browse products |
| **User** | Standard customer | Full shopping experience |
| **Admin** | Platform administrator | Manage products, users, orders |

---

## 🗄️ Database Schema (Prisma)

### User Model
```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  role      String   @default("user")
  addresses Address[]
  orders    Order[]
}
```

### Product Model
```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String
  price       Float
  image       String
  stock       Int
  createdAt   DateTime @default(now())
}
```

### Address Model
```prisma
model Address {
  id         Int     @id @default(autoincrement())
  user       User    @relation(fields: [userId], references: [id])
  userId     Int
  fullName   String
  street     String
  city       String
  postalCode String
  country    String
  phone      String
  isDefault  Boolean @default(false)
}
```

### Order Model
```prisma
model Order {
  id        Int      @id @default(autoincrement())
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  address   Address  @relation(fields: [addressId], references: [id])
  addressId Int
  products  Json
  total     Float
  status    String   @default("pending")
  createdAt DateTime @default(now())
}
```

---

## 📁 Backend Structure

```
server/
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   └── adminController.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   └── adminRoutes.js
├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── prisma/
│   └── client.js
└── server.js
```

---

## 🛣️ API Routes

### 🔐 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | User registration |
| `POST` | `/api/auth/login` | User login |
| `GET` | `/api/auth/profile` | Get user profile |

### 🛒 Products
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/products` | Get all products | Public |
| `GET` | `/api/products/:id` | Get product by ID | Public |
| `POST` | `/api/products` | Create product | Admin only |
| `PUT` | `/api/products/:id` | Update product | Admin only |
| `DELETE` | `/api/products/:id` | Delete product | Admin only |

### 🚚 Orders
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/api/orders` | Create order | User |
| `GET` | `/api/orders` | Get user orders | User |
| `GET` | `/api/admin/orders` | Get all orders | Admin only |
| `PUT` | `/api/admin/orders/:id` | Update order status | Admin only |

### 🏠 Address
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/address` | Get user addresses |
| `POST` | `/api/address` | Add new address |
| `PUT` | `/api/address/:id` | Update address |
| `DELETE` | `/api/address/:id` | Delete address |

---

## 🎨 Frontend Structure

```
client/
├── pages/
│   ├── Home.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── UserDashboard.jsx
│   └── AdminDashboard.jsx
├── components/
│   ├── ProductCard.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── AddressForm.jsx
├── context/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── services/
│   └── api.js (Axios + JWT)
├── App.jsx
└── main.jsx
```

---

## 🔒 Authentication & Authorization

- **JWT Token:** Stored in HTTP-only cookie
- **authMiddleware:** Protects authenticated routes
- **roleMiddleware:** Enforces admin privileges
- **Password Hashing:** bcrypt for secure password storage

---

## 🧪 Testing Plan

- ✅ Use **Postman** to test all API endpoints
- ✅ Validate forms on frontend with proper error handling
- ✅ Test complete user flows: Auth → Cart → Checkout → Orders
- ✅ Handle edge cases (empty cart, insufficient stock, network errors)
- ✅ Cross-browser compatibility testing

---

## 📅 Development Roadmap

| Week | Objectives |
|------|------------|
| **Week 1** | Setup backend, authentication, Prisma models |
| **Week 2** | Build products & orders APIs, middleware |
| **Week 3** | Build auth + product pages (frontend) |
| **Week 4** | Implement Cart, Checkout, Order pages |
| **Week 5** | Build Admin dashboard & role-based access |
| **Week 6** | Final testing, UI polish, and deployment |

---

## 🚀 Deployment Plan

| Component | Platform | Notes |
|-----------|----------|-------|
| **Frontend** | Vercel | Automatic deployments from Git |
| **Backend** | Render / Railway | Environment variables setup |
| **Database** | PlanetScale / Railway | MySQL with connection pooling |
| **Domain** | Custom domain + HTTPS | Optional but recommended |

---

## 🔮 Future Enhancements (Phase 2+)

### Payment & Business
- 💳 **bKash payment integration** for Bangladesh market
- 📊 **Admin analytics & charts** for sales insights
- 📄 **PDF invoice generation** for orders
- 💰 **Multi-currency support**

### Technical Improvements  
- 🛡️ **Rate limiting & advanced security** 
- ✉️ **Email notifications** (order confirmations, shipping updates)
- 📱 **Progressive Web App (PWA)** support
- 🔍 **Advanced search & filtering** (Elasticsearch)
- 📸 **Image optimization & CDN** integration

### User Experience
- ⭐ **Product reviews & ratings**
- 🎯 **Personalized recommendations**
- 💬 **Live chat support**
- 📱 **Mobile app** (React Native)

---

## 🛠️ Development Setup

### Prerequisites
- Node.js (v18+)
- MySQL database
- Git

### Quick Start
```bash
# Clone repository
git clone <repository-url>
cd techshop

# Backend setup
cd server
npm install
npx prisma generate
npx prisma db push
npm run dev

# Frontend setup (new terminal)
cd client
npm install
npm run dev
```

### Environment Variables
```env
# Backend (.env)
DATABASE_URL="mysql://..."
JWT_SECRET="your-secret-key"
NODE_ENV="development"

# Frontend (.env)
VITE_API_URL="http://localhost:5000"
```

---

*Happy coding! 🚀*