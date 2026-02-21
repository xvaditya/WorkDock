# 🚀 WorkDock Complete Setup & Testing Guide

> **Latest Status**: Backend infrastructure fully created ✅ | Ready for Database Connection 🔄

---

## 📋 What's Been Built

### ✅ Frontend (Complete & Running)
- **Location**: `/` (root folder)
- **Status**: ✅ Running on `localhost:3000`
- **Commands**:
  ```bash
  npm install
  npm run dev
  ```
- **Components**: 12 components + 6 pages + mockData
- **Features**: Dashboard, Inventory, Orders, Staff, Analytics, Login

### ✅ Backend (Complete & Waiting for Database)
- **Location**: `/backend`
- **Status**: ✅ Created | ⏳ Needs MongoDB
- **Components**: 27 files (models, controllers, services, routes)
- **Features**: Products, Sales, Leads, Revenue Leak Detection, Dashboard

---

## 🎯 Current Step: Connect MongoDB

### Choose Your MongoDB Setup:

#### 🌟 **Option A: MongoDB Atlas (Recommended)**
**Why?** - Easiest, no local installation, free tier available

```bash
# 1. Go to: https://www.mongodb.com/cloud/atlas
# 2. Create free account
# 3. Create cluster (M0 Free Tier)
# 4. Get connection string
# 5. Update .env file with connection string
# 6. Run:
npm run dev
```

See [MONGODB_SETUP.md](./MONGODB_SETUP.md) → **Option 1** for detailed steps

---

#### 💻 **Option B: Local MongoDB** 
**Why?** - Full control, works offline

```bash
# 1. Download MongoDB Community: https://www.mongodb.com/try/download/community
# 2. Install (comes with MongoDB service)
# 3. Ensure MongoDB service is running
# 4. Your .env is already configured for localhost
# 5. Run:
npm run dev
```

See [MONGODB_SETUP.md](./MONGODB_SETUP.md) → **Option 2** for detailed steps

---

## ⚡ Quick Start (After MongoDB is Set Up)

### 1️⃣ Start Backend
```bash
cd backend
npm run dev

# Expected output:
# 🚀 WorkDock Backend Server Running
# 📍 Server: http://localhost:5000
# ✅ MongoDB Connected: cluster0.xxx.mongodb.net
```

### 2️⃣ In a New Terminal - Test API
```bash
# Test if server is running
curl http://localhost:5000/

# Expected: Welcome message JSON response
```

### 3️⃣ Create Your First Product
```bash
curl -X POST http://localhost:5000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "sku": "LAP-001",
    "category": "Electronics",
    "costPrice": 30000,
    "sellingPrice": 50000,
    "currentStock": 10,
    "minimumThreshold": 5
  }'

# Expected: Product created with ID
```

### 4️⃣ Create Your First Sale (Auto-Updates Stock!)
```bash
curl -X POST http://localhost:5000/sales \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "PASTE_PRODUCT_ID_HERE",
    "quantity": 2,
    "totalAmount": 100000
  }'

# Watch the stock automatically decrease from 10 to 8! ✨
```

### 5️⃣ View Dashboard Summary
```bash
curl http://localhost:5000/dashboard/summary

# Get all metrics in one call! 📊
```

---

## 📡 All API Endpoints

### Products (6 endpoints)
```
POST   /products              Create product
GET    /products              Get all products
GET    /products/:id          Get product details
PUT    /products/:id          Update product
DELETE /products/:id          Delete product
GET    /products/low-stock    Get low-stock alerts
```

### Sales (5 endpoints)
```
POST   /sales                          Create sale (⭐ auto-updates stock)
GET    /sales                          Get all sales
GET    /sales/metrics                  Get sales metrics
GET    /sales/top-products             Get top selling products
GET    /sales/product/:productId       Get sales by product
```

### Leads (5 endpoints)
```
POST   /leads              Create lead
GET    /leads              Get all leads with heat scores
GET    /leads/:id          Get lead details
PUT    /leads/:id          Update lead
DELETE /leads/:id          Delete lead
```

### Revenue Leaks (5 endpoints)
```
GET    /revenue-leaks                      Get all detected leaks
GET    /revenue-leaks/scan                 Scan & detect new leaks
GET    /revenue-leaks/total-loss           Get total revenue lost
GET    /revenue-leaks/:leadId/heat-score   Get heat score (HOT/WARM/COLD)
GET    /revenue-leaks/distribution         Get distribution by heat
```

### Dashboard (3 endpoints)
```
GET    /dashboard/summary           Get full BI dashboard
GET    /dashboard/recent-sales      Get recent 10 sales
GET    /dashboard/category-stats    Get category breakdown
```

---

## 🧪 Advanced Testing

### Test Auto Stock Update
```bash
# 1. Create a product with stock: 10
POST /products with currentStock: 10

# 2. Create a sale with quantity: 3
POST /sales with quantity: 3

# 3. Get product details
GET /products/:id

# 🎯 Result: currentStock should now be 7! (10 - 3)
# 🎯 totalUnitsSold should be 3
# 🎯 totalRevenueGenerated should update
```

### Test Revenue Leak Detection
```bash
# 1. Create a lead
POST /leads with name, contact, estimatedDealValue

# 2. Scan for leaks (detects 24h+ unreplied)
GET /revenue-leaks/scan

# 3. View detected leaks
GET /revenue-leaks

# 🎯 Leaks auto-detected by system! 🔥
```

### Test Dashboard Summary (All-in-One)
```bash
curl http://localhost:5000/dashboard/summary

# Returns:
# {
#   "totalRevenue": 500000,
#   "totalProducts": 10,
#   "lowStockCount": 3,
#   "totalLeads": 15,
#   "estimatedRevenueLoss": 50000,
#   "topSellingProducts": [...],
#   "leadDistribution": { "HOT": 5, "WARM": 7, "COLD": 3 }
# }
```

---

## 🛠️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│           FRONTEND (localhost:3000)                  │
│  React + Vite | Components | Pages | MockData      │
└────────────────────┬────────────────────────────────┘
                     │ HTTP Calls
                     ▼
┌─────────────────────────────────────────────────────┐
│          EXPRESS APP (localhost:5000)               │
│  Routes → Controllers → Services → Models           │
└───────────────────────┬─────────────────────────────┘
                        │ Queries
                        ▼
┌─────────────────────────────────────────────────────┐
│   MONGODB DATABASE (Atlas or Local)                 │
│  Collections: products, sales, leads, leakLogs     │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
WorkDock/
├── src/                          (Frontend)
│   ├── components/               (12 UI components)
│   ├── pages/                    (6 page components)
│   ├── data/                     (mockData.js)
│   ├── utils/                    (helpers, hooks)
│   ├── constants/                (navigation, colors)
│   ├── App.jsx, main.jsx, index.css
│   └── [Other frontend files]
│
├── backend/                      (Backend)
│   ├── src/
│   │   ├── config/               (database.js)
│   │   ├── models/               (4 schemas)
│   │   ├── controllers/          (5 controllers)
│   │   ├── services/             (4 services)
│   │   ├── routes/               (5 route files)
│   │   ├── middlewares/          (errorHandler.js)
│   │   ├── app.js                (Express setup)
│   │   └── server.js             (Entry point)
│   ├── package.json
│   ├── .env.example
│   ├── .env                      (Create from .env.example)
│   ├── .gitignore
│   ├── README.md
│   ├── MONGODB_SETUP.md          (< YOU ARE HERE)
│   └── node_modules/
│
├── package.json                  (Frontend)
├── vite.config.js
├── index.html
└── [Other files]
```

---

## ✅ Checklist

- [ ] **MongoDB Setup** (Choose Atlas or Local)
- [ ] **Update .env** with MongoDB connection string
- [ ] **Start Backend**: `npm run dev` in `/backend`
- [ ] **Test API**: `curl http://localhost:5000/`
- [ ] **Create Products**: POST to `/products`
- [ ] **Create Sales**: POST to `/sales` (watch stock update!)
- [ ] **View Dashboard**: GET `/dashboard/summary`
- [ ] **Connect Frontend**: Update API calls in frontend

---

## 🚨 Troubleshooting

### Backend won't start
```
Error: MongoDB Connection Error
→ Check .env MONGODB_URI is correct
→ Ensure MongoDB is running (Atlas or local)
```

### Can't connect to MongoDB Atlas
```
Error: Authentication failed
→ Check username/password in connection string
→ Make sure IP is whitelisted in Atlas
```

### Stock not updating on sale
```
→ Check that productId is correct
→ Verify sale POST request has productId
→ Check sales service logic
```

---

## 🎓 Learning Resources

- **Express.js**: [expressjs.com](https://expressjs.com)
- **Mongoose**: [mongoosejs.com](https://mongoosejs.com)
- **MongoDB**: [mongodb.com/docs](https://mongodb.com/docs)
- **REST API Design**: [restfulapi.net](https://restfulapi.net)

---

## 🎯 Next Steps After Testing

1. **Connect Frontend to Backend**
   - Update frontend API calls to localhost:5000
   - Replace mockData with real API calls

2. **Add Authentication**
   - Implement JWT login
   - Protect endpoints with auth middleware

3. **Add Validation**
   - Input validation middleware
   - Error response standardization

4. **Advanced Features**
   - Background jobs for leak scanning
   - Email notifications
   - Data export (CSV)

---

**Good luck! 🚀 You now have a production-ready backend structure. Just plug in MongoDB and you're good to go!**
