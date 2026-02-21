# 🗄️ MongoDB Setup Guide

WorkDock Backend requires MongoDB to store data. Choose one of the options below:

---

## Option 1: MongoDB Atlas (Cloud) ⭐ RECOMMENDED

**Easiest and quickest setup - no local installation needed!**

### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up" and create a free account
3. Verify your email

### Step 2: Create a Cluster
1. After signing up, click "Create a Deployment"
2. Select **Free Tier** (M0)
3. Choose your preferred region
4. Click "Create Deployment"
5. Wait 1-2 minutes for cluster to be ready

### Step 3: Get Connection String
1. Click "Connect" button
2. Choose "Drivers"
3. Select "Node.js" as driver
4. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.xxx.mongodb.net/workdock?retryWrites=true&w=majority
   ```

### Step 4: Create Database User
1. In Atlas, go to "Database Access"
2. Click "Add New Database User"
3. Set username: `workdock_user`
4. Set password: (auto-generate)
5. Click "Add User"

### Step 5: Update .env
Edit `.env` file and replace:
```
MONGODB_URI=mongodb+srv://workdock_user:PASSWORD@cluster0.xxx.mongodb.net/workdock?retryWrites=true&w=majority
```

Replace `PASSWORD` with your actual password from step 4.

### Step 6: Start Server
```bash
npm run dev
```

✅ **Done!** Your backend is now connected to MongoDB Atlas.

---

## Option 2: Local MongoDB (Windows)

### Step 1: Download MongoDB
1. Visit [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Select:
   - **Version**: Latest Stable
   - **OS**: Windows
   - **Package**: msi
3. Download and run the installer

### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Click "Next" through the installation wizard
3. Choose "Complete" installation
4. Check "Install MongoDB as a Service"
5. Click "Install"

### Step 3: Start MongoDB
MongoDB service should start automatically. To verify:

**PowerShell (as Administrator):**
```powershell
Get-Service MongoDB | Start-Service
```

Or use Services app:
- Press `Win + R`
- Type `services.msc`
- Find "MongoDB Server"
- Right-click → Start

### Step 4: Update .env
Your `.env` should already have:
```
MONGODB_URI=mongodb://localhost:27017/workdock
```

### Step 5: Start Server
```bash
npm run dev
```

✅ **Done!** MongoDB is running locally and your backend is connected.

---

## Troubleshooting

### "MongoDB Connection Error"
- **Atlas**: Check connection string in `.env` (replace USERNAME and PASSWORD)
- **Local**: Ensure MongoDB service is running (`Get-Service MongoDB`)

### "Authentication failed for user"
- **Atlas**: Verify username/password in connection string
- **Local**: If fresh install, no auth is needed by default

### Port already in use (5000)
```powershell
# Find process using port 5000
netstat -ano | findstr :5000
# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

---

## Next Steps

Once MongoDB is connected and server is running:

1. **Test API Endpoints:**
   ```bash
   # In a new terminal
   curl http://localhost:5000/
   ```

2. **Create test data:**
   ```bash
   curl -X POST http://localhost:5000/products \
     -H "Content-Type: application/json" \
     -d '{"name":"Laptop","sku":"LAP-001","category":"Electronics","costPrice":30000,"sellingPrice":50000,"currentStock":10,"minimumThreshold":5}'
   ```

3. **View Dashboard Summary:**
   ```bash
   curl http://localhost:5000/dashboard/summary
   ```

---

## Quick Connection Test

```bash
# See if MongoDB is running
mongosh --eval "db.version()"

# If using Atlas MongoDB client:
mongosh "mongodb+srv://username:password@cluster.mongodb.net/workdock"
```

---

## Recommended: MongoDB GUI Tools

- **MongoDB Compass** (Official): [mongodb.com/products/compass](https://www.mongodb.com/products/compass)
- **Studio 3T**: [studio3t.com](https://studio3t.com)
- Both are free for development

---

Done! Choose one option above and your backend will be ready to go! 🚀
