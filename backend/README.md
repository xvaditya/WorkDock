# WorkDock Backend 🏭

**Production-Grade Node.js + Express Backend for WorkDock B2B SaaS**

## 🎯 Features

### Core Engines
- ✅ **Revenue Leak Detection** - Automated revenue loss tracking
- ✅ **Smart Follow-Up Intelligence** - AI-powered follow-up suggestions
- ✅ **Product Management** - SKU, pricing, stock management
- ✅ **Auto Stock Updates** - Real-time inventory sync with sales
- ✅ **Sales Analytics** - Product-wise performance tracking
- ✅ **Dashboard Summary** - Executive intelligence panel

### Architecture
- 🏗️ **Clean MVC** - Separated Models, Controllers, Services
- 📦 **Modular Structure** - Easy to maintain and scale
- 🔒 **Error Handling** - Centralized middleware
- 🗄️ **MongoDB Integration** - Mongoose ODM
- 🚀 **Production Ready** - Enterprise-grade code quality

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js           # MongoDB connection
│   ├── models/
│   │   ├── Product.js            # Product schema
│   │   ├── Sale.js               # Sales transactions
│   │   ├── Lead.js               # Lead management
│   │   └── RevenueLeakLog.js     # Leak tracking
│   ├── controllers/
│   │   ├── productController.js  # Product endpoints
│   │   ├── salesController.js    # Sales endpoints
│   │   ├── leadController.js     # Lead endpoints
│   │   ├── revenueLeakController.js
│   │   └── dashboardController.js
│   ├── services/
│   │   ├── productService.js     # Product business logic
│   │   ├── salesService.js       # Auto-update stock logic
│   │   ├── revenueLeakService.js # Leak detection engine
│   │   └── dashboardService.js   # Summary aggregations
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── salesRoutes.js
│   │   ├── leadRoutes.js
│   │   ├── revenueLeakRoutes.js
│   │   └── dashboardRoutes.js
│   ├── middlewares/
│   │   └── errorHandler.js       # Centralized error handling
│   ├── utils/
│   ├── jobs/                     # Background jobs (future)
│   ├── app.js                    # Express app setup
│   └── server.js                 # Server entry point
├── package.json
├── .env.example
└── .gitignore
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- MongoDB (local or Atlas)

### Installation

```bash
cd backend
cp .env.example .env
npm install
```

### Configuration

Edit `.env`:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/workdock
JWT_SECRET=your_secret_key
```

### Run Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server starts at `http://localhost:5000`

---

## 📊 Database Models

### Product
```javascript
{
  name: String,
  sku: String (unique),
  category: String,
  costPrice: Number,
  sellingPrice: Number,
  currentStock: Number,
  minimumThreshold: Number,
  totalUnitsSold: Number,
  totalRevenueGenerated: Number,
  createdAt: Date
}
// Virtuals: profitPerUnit, totalProfit
```

### Sale
```javascript
{
  productId: ObjectId,
  quantity: Number,
  totalAmount: Number,
  soldAt: Date
}
```

### Lead
```javascript
{
  name: String,
  contact: String,
  source: enum['whatsapp', 'instagram', 'email', 'manual'],
  lastMessageTime: Date,
  lastReplyTime: Date,
  estimatedDealValue: Number,
  status: enum['new', 'contacted', 'followup', 'closed', 'lost'],
  followUpCount: Number,
  createdAt: Date
}
// Virtuals: responseTimeHours, heatScore
```

### RevenueLeakLog
```javascript
{
  leadId: ObjectId,
  reason: enum['no_reply', 'delayed_reply', 'no_followup', 'inactive'],
  estimatedLoss: Number,
  detectedAt: Date
}
```

---

## 🔥 Core Engines Explained

### 1️⃣ Revenue Leak Detection

Automatically detects lost revenue opportunities:

**Triggers:**
- No reply for 24+ hours
- Status = contacted, no followup for 48+ hours
- Lead marked as lost or inactive

**Heat Score:**
- 🔥 HOT: Reply < 1 hour
- 🌡️ WARM: Reply 1-6 hours
- ❄️ COLD: Reply > 24 hours

**Smart Follow-Up:**
```
HOT  → Polite check-in
WARM → Persuasive close attempt
COLD → Re-engagement message
```

### 2️⃣ Auto Stock Update

When a sale is created:
1. Validates product exists
2. Checks sufficient stock
3. Reduces currentStock
4. Increases totalUnitsSold
5. Increases totalRevenueGenerated

### 3️⃣ Dashboard Summary

Real-time metrics:
- Total revenue
- Total products
- Low stock count
- Active leads
- Estimated revenue lost
- Lead distribution (HOT/WARM/COLD)
- Top selling products
- Category-wise stats

---

## 📡 API Endpoints

### Products
```
POST   /products              Create product
GET    /products              Get all products
GET    /products/:id          Get product details
PUT    /products/:id          Update product
DELETE /products/:id          Delete product
GET    /products/low-stock    Get low-stock alerts
```

### Sales
```
POST   /sales                 Create sale (auto-updates stock)
GET    /sales                 Get all sales
GET    /sales/metrics         Get sales metrics
GET    /sales/top-products    Get top selling products
GET    /sales/product/:id     Get sales by product
```

### Leads
```
POST   /leads                 Create lead
GET    /leads                 Get all leads
GET    /leads/:id             Get lead details
PUT    /leads/:id             Update lead
DELETE /leads/:id             Delete lead
```

### Revenue Leaks
```
GET    /revenue-leaks                  Get all leaks
GET    /revenue-leaks/scan             Scan for new leaks
GET    /revenue-leaks/total-loss       Get total loss
GET    /revenue-leaks/:id/heat-score   Get lead heat score
GET    /revenue-leaks/distribution     Get lead distribution
```

### Dashboard
```
GET    /dashboard/summary       Get full dashboard summary
GET    /dashboard/recent-sales  Get recent sales
GET    /dashboard/category-stats Get category-wise stats
```

---

## 💡 Example Requests

### Create Product
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
```

### Create Sale (Auto-updates stock)
```bash
curl -X POST http://localhost:5000/sales \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "655c8f1a2b1d2c3d4e5f6g7h",
    "quantity": 2,
    "totalAmount": 100000
  }'
```

### Create Lead
```bash
curl -X POST http://localhost:5000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "contact": "9876543210",
    "source": "whatsapp",
    "estimatedDealValue": 50000
  }'
```

### Get Dashboard Summary
```bash
curl http://localhost:5000/dashboard/summary
```

---

## 🛡️ Error Handling

All errors return consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional validation errors
}
```

**Status Codes:**
- 200: Success
- 201: Created
- 400: Bad Request / Validation Error
- 404: Not Found
- 500: Server Error

---

## 🔄 Service Layer Architecture

**Thin Controllers** ➜ **Service Layer** ➜ **Models**

Controllers only:
- Parse requests
- Call services
- Return responses

Services handle:
- Business logic
- Data aggregations
- Validations
- Complex calculations

---

## 📈 Scalability Ready

✅ **Multi-tenant Support** - Ready for tenant isolation
✅ **Indexing** - Mongoose indexes on important fields
✅ **Async/Await** - Non-blocking operations
✅ **Error Isolation** - Centralized error handling
✅ **Clean Code** - Modular, maintainable structure

---

## 🚀 Future Enhancements

- [ ] Authentication & JWT
- [ ] User roles & permissions
- [ ] Webhook integrations
- [ ] Background jobs for leak detection
- [ ] API rate limiting
- [ ] Data export (CSV/PDF)
- [ ] Email notifications
- [ ] Real-time WebSocket updates
- [ ] Multi-tenant database isolation
- [ ] Advanced analytics queries

---

## 📝 License

MIT - Open source, use freely.

---

## 💬 Support

Need help? Check the code structure above or review individual service/controller files.

**WorkDock Backend v1.0** — *Enterprise-Grade Operations Platform* 🏭
