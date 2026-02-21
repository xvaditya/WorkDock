export const MOCK_INVENTORY = [
  { id: 1, name: "Titanium Bolt Set", sku: "TBS-001", stock: 4, threshold: 10, price: 24.99, category: "Hardware" },
  { id: 2, name: "Carbon Fibre Sheet", sku: "CFS-002", stock: 18, threshold: 5, price: 149.99, category: "Materials" },
  { id: 3, name: "Precision Caliper", sku: "PC-003", stock: 2, threshold: 8, price: 79.50, category: "Tools" },
  { id: 4, name: "Industrial Lubricant", sku: "IL-004", stock: 31, threshold: 15, price: 19.99, category: "Consumables" },
  { id: 5, name: "HEX Socket Set", sku: "HSS-005", stock: 6, threshold: 12, price: 44.99, category: "Tools" },
  { id: 6, name: "Copper Wire Spool", sku: "CWS-006", stock: 3, threshold: 10, price: 34.99, category: "Electrical" },
  { id: 7, name: "Thermal Compound", sku: "TC-007", stock: 22, threshold: 10, price: 12.50, category: "Consumables" },
  { id: 8, name: "Servo Motor 12V", sku: "SM-008", stock: 1, threshold: 5, price: 89.00, category: "Electrical" },
];

export const MOCK_ORDERS = [
  { id: "ORD-1091", client: "NovaMach Industries", items: 12, value: 2450.00, status: "pending", assignee: "Sara K.", date: "2025-02-19" },
  { id: "ORD-1092", client: "Zenith Fabrications", items: 4, value: 780.50, status: "in-progress", assignee: "Tom R.", date: "2025-02-19" },
  { id: "ORD-1093", client: "Apex Dynamics", items: 7, value: 1320.00, status: "completed", assignee: "Leo M.", date: "2025-02-18" },
  { id: "ORD-1094", client: "Ferro Corp", items: 22, value: 5610.00, status: "pending", assignee: "Sara K.", date: "2025-02-18" },
  { id: "ORD-1095", client: "Bolt & Scale Co.", items: 3, value: 390.00, status: "in-progress", assignee: "Yuki J.", date: "2025-02-17" },
  { id: "ORD-1096", client: "TriState Metals", items: 9, value: 2100.00, status: "pending", assignee: "Tom R.", date: "2025-02-17" },
  { id: "ORD-1097", client: "Quantum Parts", items: 15, value: 3875.00, status: "completed", assignee: "Leo M.", date: "2025-02-16" },
  { id: "ORD-1098", client: "Orion Solutions", items: 6, value: 950.00, status: "pending", assignee: "Yuki J.", date: "2025-02-16" },
];

export const MOCK_STAFF = [
  { id: 1, name: "Sara K.", role: "Logistics Lead", avatar: "SK", tasks: [
    { id: 1, title: "Dispatch ORD-1091 shipment", due: "2025-02-20", done: false, overdue: false },
    { id: 2, title: "Update warehouse zone B", due: "2025-02-18", done: false, overdue: true },
    { id: 3, title: "Client call – NovaMach", due: "2025-02-22", done: true, overdue: false },
  ]},
  { id: 2, name: "Tom R.", role: "Operations Manager", avatar: "TR", tasks: [
    { id: 4, title: "Review Q1 procurement plan", due: "2025-02-21", done: false, overdue: false },
    { id: 5, title: "Coordinate ORD-1096 fulfillment", due: "2025-02-19", done: false, overdue: true },
    { id: 6, title: "Staff shift schedule", due: "2025-02-20", done: false, overdue: false },
  ]},
  { id: 3, name: "Leo M.", role: "Fulfillment Specialist", avatar: "LM", tasks: [
    { id: 7, title: "Pack and label ORD-1093", due: "2025-02-18", done: true, overdue: false },
    { id: 8, title: "Inventory zone A audit", due: "2025-02-17", done: false, overdue: true },
  ]},
  { id: 4, name: "Yuki J.", role: "Client Relations", avatar: "YJ", tasks: [
    { id: 9, title: "Follow up Orion Solutions quote", due: "2025-02-22", done: false, overdue: false },
    { id: 10, title: "Prepare ORD-1095 invoice", due: "2025-02-21", done: false, overdue: false },
    { id: 11, title: "Onboard Bolt & Scale Co.", due: "2025-02-16", done: true, overdue: false },
  ]},
];

export const REVENUE_DATA = [
  { day: "Mon", revenue: 4200, orders: 6 },
  { day: "Tue", revenue: 6800, orders: 9 },
  { day: "Wed", revenue: 5300, orders: 7 },
  { day: "Thu", revenue: 9100, orders: 13 },
  { day: "Fri", revenue: 7600, orders: 11 },
  { day: "Sat", revenue: 3200, orders: 4 },
  { day: "Sun", revenue: 2800, orders: 3 },
];

export const CATEGORY_DATA = [
  { name: "Hardware", value: 35 },
  { name: "Tools", value: 28 },
  { name: "Electrical", value: 20 },
  { name: "Materials", value: 12 },
  { name: "Consumables", value: 5 },
];
