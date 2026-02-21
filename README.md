# WorkDock - Operational Command Layer

A modern React-based warehouse and operations management dashboard with a sleek glassmorphism UI design.

## Project Structure

```
src/
├── components/                 # Reusable components
│   ├── charts/                # Chart components
│   │   ├── BarChart.jsx      # Revenue bar chart
│   │   ├── DonutChart.jsx    # Category distribution donut chart
│   │   └── Sparkline.jsx     # Mini sparkline charts
│   ├── layout/               # Layout components
│   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   └── Topbar.jsx        # Top navigation bar
│   └── ui/                   # UI components
│       ├── AlertBanner.jsx   # Alert notification banner
│       ├── GlassCard.jsx     # Glassmorphic card wrapper
│       ├── MetricCard.jsx    # Metric display card
│       └── StatusBadge.jsx   # Status indicator badge
├── pages/                      # Page components
│   ├── AnalyticsPage.jsx     # Analytics & intelligence page
│   ├── DashboardPage.jsx     # Main dashboard page
│   ├── InventoryPage.jsx     # Inventory management page
│   ├── LoginPage.jsx         # Login authentication page
│   ├── OrdersPage.jsx        # Orders management page
│   └── StaffPage.jsx         # Staff & tasks management page
├── data/                       # Data and mock data
│   └── mockData.js           # Mock inventory, orders, staff data
├── utils/                      # Utility functions
│   └── helpers.js            # Currency formatting, custom hooks
├── constants/                  # Constants and configurations
│   └── index.js              # Navigation, status config, colors
├── App.jsx                    # Main app component
├── main.jsx                   # Entry point
└── index.css                  # Global styles
```

## Key Features

### Components
- **GlassCard**: Reusable glassmorphic card with glow and alert states
- **MetricCard**: Animated metric display with sparkline charts
- **StatusBadge**: Dynamic status indicators for orders
- **Charts**: SVG-based BarChart, DonutChart, and Sparkline components

### Layout
- **Sidebar**: Fixed navigation with alert indicators
- **Topbar**: Sticky top bar with search and notifications

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
- **Background**: Dark with gradient overlays and grid texture
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
