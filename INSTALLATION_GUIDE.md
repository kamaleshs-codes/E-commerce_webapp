# 📦 E-Commerce Website - Complete Installation Guide

## Download & Extract

1. Download the `ecommerce-website-complete.zip` file
2. Extract the zip file to your desired location
3. You'll see the following structure:

```
ecommerce-project/
├── backend/              # Node.js + Express backend
├── frontend/             # React.js frontend
├── README.md            # Main documentation
├── QUICKSTART.md        # Quick setup guide
├── API_DOCS.md          # API reference
└── PROJECT_OVERVIEW.md  # Architecture details
```

## Prerequisites Installation

### 1. Install Node.js
- Download from: https://nodejs.org/
- Recommended: LTS version (v18 or higher)
- Verify installation: `node --version` and `npm --version`

### 2. Install MongoDB

**Windows:**
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Install MongoDB as a service
5. Verify: Open Command Prompt and run `mongod --version`

**macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

Verify MongoDB is running:
```bash
mongosh  # or mongo (for older versions)
```

## Step-by-Step Setup

### Step 1: Extract and Navigate
```bash
# Extract the zip file (if not already done)
# Navigate to the project folder
cd ecommerce-project
```

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies (this will take 1-2 minutes)
npm install

# Create sample data in database
npm run seed

# You should see:
# "MongoDB Connected"
# "Products seeded successfully!"
# "Admin user created successfully!"
# "Regular user created successfully!"
```

**Default Users Created:**
- Admin: `admin@example.com` / `admin123`
- User: `john@example.com` / `password123`

```bash
# Start the backend server
npm start

# You should see:
# "Server running in development mode on port 5000"
# "MongoDB Connected: localhost"
```

✅ Backend is now running at http://localhost:5000

### Step 3: Frontend Setup (New Terminal)

Open a **new terminal window** (keep backend running):

```bash
# Navigate to frontend folder
cd ecommerce-project/frontend

# Install dependencies (this will take 2-3 minutes)
npm install

# Start the React development server
npm start
```

The browser will automatically open at http://localhost:3000

✅ Frontend is now running!

## Verification Steps

### 1. Check Backend API
Open browser and visit: http://localhost:5000
You should see: `{"message": "E-commerce API is running..."}`

### 2. Check Frontend
Your browser should automatically open http://localhost:3000
You should see the ShopHub home page with products

### 3. Test Login
1. Click "Login" in the navigation
2. Use credentials: `john@example.com` / `password123`
3. You should be redirected to home page with "Hi, John Doe" in nav

### 4. Test Shopping
1. Click any product to view details
2. Click "Add to Cart"
3. Click "Cart" in navigation
4. You should see your product in the cart

## Common Issues & Solutions

### Issue: "Port 5000 already in use"

**Solution 1 - Kill the process:**
```bash
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows (Command Prompt as Admin)
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

**Solution 2 - Change port:**
Edit `backend/.env` and change `PORT=5000` to `PORT=5001`

### Issue: "MongoDB connection failed"

**Check if MongoDB is running:**
```bash
# macOS
brew services list

# Linux
sudo systemctl status mongod

# Windows
services.msc (look for MongoDB)
```

**Start MongoDB:**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Frontend shows blank page

**Solution:**
1. Open browser console (F12)
2. Check for errors
3. Make sure backend is running on port 5000
4. Clear browser cache and reload

### Issue: "CORS error" in browser console

**Solution:**
- Ensure backend is running on http://localhost:5000
- Check `frontend/package.json` has `"proxy": "http://localhost:5000"`
- Restart both frontend and backend

## Testing the Application

### 1. Browse Products
- Home page displays 12 sample products
- Try filtering by category (Electronics, Sports, etc.)
- Each product shows image, name, price, and rating

### 2. Product Details
- Click any product card
- View full description, stock status
- Use quantity selector
- Click "Add to Cart" or "Buy Now"

### 3. Shopping Cart
- Click "Cart" in navigation
- Update quantities using +/- buttons
- Remove items
- View order summary with calculations
- Click "Proceed to Checkout"

### 4. User Authentication
- Click "Sign Up" and create new account
- Or login with: `john@example.com` / `password123`
- Try logging out and back in

### 5. Checkout Process
- Add products to cart
- Login (if not already)
- Click "Proceed to Checkout"
- Fill shipping information:
  - Address: 123 Main Street
  - City: New York
  - Postal Code: 10001
  - Country: USA
- Click "Place Order"

### 6. Order History
- After placing order, click "Orders" in navigation
- View your order with:
  - Order number
  - Products ordered
  - Shipping address
  - Total amount
  - Order status

### 7. Admin Features (API Only)
Login as admin (`admin@example.com` / `admin123`) and use API to:
- Create new products
- Update products
- Delete products
- View all orders

See `API_DOCS.md` for endpoints.

## File Structure Explained

```
ecommerce-project/
│
├── backend/                      # Backend server
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Product.js           # Product schema
│   │   └── Order.js             # Order schema
│   ├── routes/
│   │   ├── authRoutes.js        # Login/Register
│   │   ├── productRoutes.js     # Product CRUD
│   │   └── orderRoutes.js       # Order management
│   ├── .env                     # Environment variables
│   ├── package.json             # Dependencies
│   ├── server.js                # Main server file
│   └── seed.js                  # Database seeding
│
├── frontend/                     # React frontend
│   ├── public/
│   │   └── index.html           # HTML template
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Navbar.js
│   │   │   └── ProductCard.js
│   │   ├── context/             # State management
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── pages/               # Page components
│   │   │   ├── Home.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Checkout.js
│   │   │   └── Orders.js
│   │   ├── utils/
│   │   │   └── api.js           # API configuration
│   │   ├── App.js               # Main component
│   │   ├── App.css              # Global styles
│   │   └── index.js             # Entry point
│   └── package.json             # Dependencies
│
├── README.md                     # Main documentation
├── QUICKSTART.md                # Quick setup guide
├── API_DOCS.md                  # API reference
└── PROJECT_OVERVIEW.md          # Architecture details
```

## Development Commands

### Backend Commands
```bash
npm start          # Start server (production)
npm run dev        # Start with nodemon (auto-restart)
npm run seed       # Seed database with sample data
```

### Frontend Commands
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## Environment Configuration

### Backend (.env file)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=ecommerce_super_secret_key_2024
NODE_ENV=development
```

**For Production:**
- Change `JWT_SECRET` to a secure random string
- Update `MONGODB_URI` to production database
- Set `NODE_ENV=production`

## Next Steps

### 1. Customize the Store
- Edit product categories in `backend/models/Product.js`
- Modify colors in `frontend/src/App.css` (CSS variables)
- Update logo/branding in `frontend/src/components/Navbar.js`

### 2. Add More Products
- Edit `backend/seed.js` with your products
- Run `npm run seed` to update database
- Or use API endpoints to add products programmatically

### 3. Prepare for Production
- Set up MongoDB Atlas (cloud database)
- Configure environment variables
- Deploy backend to Heroku/Render/Railway
- Deploy frontend to Vercel/Netlify
- Add SSL certificate
- Implement payment gateway

### 4. Extend Features
- Add payment integration (Stripe/PayPal)
- Create admin dashboard UI
- Add email notifications
- Implement product reviews
- Add wishlist feature
- Upload product images

## Support & Resources

### Documentation Files:
- **README.md** - Complete setup and features guide
- **QUICKSTART.md** - Get running in 5 minutes
- **API_DOCS.md** - Full API endpoint reference
- **PROJECT_OVERVIEW.md** - Architecture and design

### Learning Resources:
- React Docs: https://react.dev/
- Express Docs: https://expressjs.com/
- MongoDB Docs: https://docs.mongodb.com/
- Mongoose Guide: https://mongoosejs.com/

### Troubleshooting:
1. Check all prerequisites are installed
2. Ensure MongoDB is running
3. Verify both servers are running (ports 5000 & 3000)
4. Check browser console for frontend errors
5. Check terminal for backend errors

## Success Checklist

- [ ] Node.js installed (v14+)
- [ ] MongoDB installed and running
- [ ] Backend dependencies installed
- [ ] Database seeded with sample data
- [ ] Backend running on port 5000
- [ ] Frontend dependencies installed
- [ ] Frontend running on port 3000
- [ ] Can browse products on home page
- [ ] Can login with test account
- [ ] Can add products to cart
- [ ] Can complete checkout
- [ ] Can view order history

---

🎉 **Congratulations!** Your e-commerce website is ready to use!

For any issues, refer to the troubleshooting section or check the documentation files.

Happy coding! 🚀
