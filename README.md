# WorkDock 🏭
**Operational Command Layer for Warehouse & Inventory Management**

A modern, AI-powered operations dashboard with real-time analytics, inventory tracking, and team management. Built with React + Vite with a premium glassmorphism UI.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
git clone https://github.com/xvaditya/workdock.git
cd workdock
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser.

---

## The Problem
Managing warehouse operations is chaos. Spreadsheets are slow. Multiple tools don't sync. You need:
- Real-time inventory alerts when stock runs low
- Order pipeline visibility across all staff
- Team task tracking that actually updates
- Revenue analytics without manual reporting

**WorkDock solves this** with a centralized command center that gives you everything at a glance.

---

## The Solution
WorkDock is a **unified operations platform** that:

| Feature | What It Does |
|---------|-------------|
| 📊 **Real-Time Dashboard** | Live metrics on revenue, orders, pending tasks, stock levels |
| 🔴 **Smart Alerts** | Critical notifications for low stock, overdue tasks, pending orders |
| 📦 **Inventory Matrix** | Stock tracking with threshold alerts and SKU management |
| 📋 **Order Pipeline** | Visual order management from pending → in-progress → completed |
| 👥 **Staff Management** | Team task assignment, progress tracking, overdue detection |
| 📈 **Analytics Core** | Revenue trends, completion rates, category distribution |
| 🔐 **Secure Login** | Demo authentication system |

---

## ✨ Features

### Dashboard
- **4 Hero Metrics**: Today's revenue, month revenue, pending orders, pending tasks
- **Weekly Revenue Flow**: Interactive bar chart showing order volume × revenue
- **Category Breakdown**: Donut chart for inventory split
- **Live Feed**: Recent orders with status badges
- **Low Stock Alerts**: Critical alerts with stock vs. threshold

### Inventory Management
- Add/remove products
- Track stock levels and thresholds
- Price management
- Category organization
- Visual low-stock indicators

### Order Control
- Create and manage orders
- Filter by status (pending, in-progress, completed)
- Assign orders to team members
- Status progression tracking
- Real-time order values

### Staff & Tasks
- View all team members
- Assign tasks with due dates
- Mark tasks complete
- Track overdue tasks
- Monitor workload per person

### Analytics
- Total week revenue
- Average order value
- Completion rates
- Revenue timeline
- Top orders by value
- Sparkline charts for trends

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework |
| **Vite 5** | Build tool & dev server |
| **SVG Charts** | Custom sparklines, bar charts, donut charts |
| **CSS-in-JS** | Glassmorphism styling |
| **JavaScript ES6+** | Core language |

---

## 📁 Project Structure

```
WorkDock/
├── src/
│   ├── components/              # Reusable components
│   │   ├── charts/
│   │   │   ├── BarChart.jsx     # Weekly revenue visualization
│   │   │   ├── DonutChart.jsx   # Category distribution
│   │   │   └── Sparkline.jsx    # Mini trend charts
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx      # Navigation sidebar
│   │   │   └── Topbar.jsx       # Top bar with search
│   │   └── ui/
│   │       ├── AlertBanner.jsx  # Alert notifications
│   │       ├── GlassCard.jsx    # Glassmorphic container
│   │       ├── MetricCard.jsx   # Animated metrics
│   │       └── StatusBadge.jsx  # Status indicators
│   ├── pages/                   # Page components
│   │   ├── AnalyticsPage.jsx    # Business intelligence
│   │   ├── DashboardPage.jsx    # Main overview
│   │   ├── InventoryPage.jsx    # Stock management
│   │   ├── LoginPage.jsx        # Authentication
│   │   ├── OrdersPage.jsx       # Order pipeline
│   │   └── StaffPage.jsx        # Team & tasks
│   ├── data/
│   │   └── mockData.js          # Mock datasets
│   ├── utils/
│   │   └── helpers.js           # Helper functions & hooks
│   ├── constants/
│   │   └── index.js             # Config & constants
│   ├── App.jsx                  # Main app logic
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

---

## 🎨 Design System

### Glassmorphism
- Frosted glass effect on cards
- 60% opacity backgrounds
- 20px blur filter
- Purple gradient accents (#7c3aed → #a855f7)

### Color Palette
- **Primary**: #a855f7 (Purple)
- **Secondary**: #ec4899 (Pink)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)
- **Dark**: #0a0812 (Almost black)

### Typography
- **Font Family**: Monospace (terminal aesthetic)
- **Exo 2**: Brand headings
- System fonts: UI text

### Animations
- `pulse`: 2s opacity animation for alert badges
- `alertPulse`: 3s for critical alerts
- Smooth hover transitions on buttons

---

## 📊 Mock Data

The app includes realistic mock data:
- **8 Inventory Items**: Various products with stock levels
- **8 Orders**: In different statuses with clients and values
- **4 Staff Members**: With assigned tasks and overdue tracking
- **7-Day Revenue**: Historical data for charts

---

## 🔐 Authentication

**Demo Credentials:**
```
Email: admin@workdock.io
Password: (any password works - demo mode)
```

---

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

**Dev Dependencies:**
```json
{
  "vite": "^5.0.8",
  "@vitejs/plugin-react": "^4.2.1"
}
```

---

## 🗓️ Changelog

### v1.0.0 (2026-02-21)
- ✅ Initial release
- ✅ Modular component architecture
- ✅ 5 main pages (Dashboard, Inventory, Orders, Staff, Analytics)
- ✅ Real-time alerts and notifications
- ✅ Interactive charts and metrics
- ✅ Glassmorphism UI design
- ✅ Mock data integration
- ✅ Task management system
- ✅ Login authentication

### Planned Features (v2.0)
- 🔄 Database integration (PostgreSQL)
- 🔄 Real API endpoints
- 🔄 User roles & permissions
- 🔄 PDF export for reports
- 🔄 Email notifications
- 🔄 Dark mode toggle
- 🔄 Mobile responsive design

---

## 📄 Assets & Attribution

### Design Inspiration
- Glassmorphism trend from modern UI design
- Terminal aesthetic from developer tools
- Dashboard layout from popular analytics platforms

### Icons & Symbols
- Unicode symbols for navigation icons
- Custom SVG charts
- Emoji for visual cues

### Fonts
- **Exo 2**: Google Fonts (Open Source)
- System monospace: OS default

### Color Scheme
- Inspired by modern dark theme dashboards
- Tailwind color palette reference

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

---

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 💬 Support

Need help? 
- Check the [GitHub Issues](https://github.com/xvaditya/workdock/issues)
- Review the code structure above
- Examine component props in source files

---

**WorkDock v1.0** — *Operate with Clarity* 🚀

### Pages
- **Dashboard**: Overview with key metrics, charts, and alerts
- **Inventory**: Product management with stock alerts
- **Orders**: Order pipeline with status tracking
- **Staff**: Team management with task assignments
- **Analytics**: Business intelligence and reporting
- **Login**: Authentication page

### Utilities
- `fmtCurrency()`: Format numbers as Indian Rupees
- `isLowStock()`: Check inventory stock levels
- `useCountUp()`: Animated counter hook

## Styling

The project uses inline styles with a glassmorphism design system:
- **Primary Color**: Purple gradient (#7c3aed to #a855f7)
- **Accent Colors**: Pink, Amber, Emerald, Indigo
- **Background**: Dark with gradient overlays and grid textures
- **Effects**: Blur, glow, shadows, animations

## Getting Started

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Build for production: `npm run build`

## Technology Stack

- React 18+
- Vite (build tool)
- CSS-in-JS (inline styles)
- SVG Charts (no external chart library)

## Demo Credentials

- Email: `admin@workdock.io`
- Password: `any password`
