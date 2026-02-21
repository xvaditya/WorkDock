import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`\n🚀 WorkDock Backend Server Running`);
      console.log(`📍 Server: http://localhost:${PORT}`);
      console.log(`🗄️  Environment: ${process.env.NODE_ENV}`);
      console.log(`\n📚 API Endpoints:`);
      console.log(`  POST   /products              - Create product`);
      console.log(`  GET    /products              - Get all products`);
      console.log(`  GET    /products/:id          - Get product details`);
      console.log(`  POST   /sales                 - Create sale`);
      console.log(`  GET    /sales                 - Get all sales`);
      console.log(`  POST   /leads                 - Create lead`);
      console.log(`  GET    /leads                 - Get all leads`);
      console.log(`  GET    /revenue-leaks         - Get revenue leaks`);
      console.log(`  GET    /dashboard/summary     - Get dashboard summary\n`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error.message);
    process.exit(1);
  }
};

startServer();
