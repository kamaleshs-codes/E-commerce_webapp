# Quick Start Guide

Follow these steps to get the e-commerce website running in minutes:

## 1. Prerequisites Check
- [ ] Node.js installed (run `node --version`)
- [ ] MongoDB installed and running (run `mongod --version`)

## 2. Start MongoDB
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

## 3. Setup Backend
```bash
cd backend
npm install
npm run seed    # Creates sample data
npm start       # Starts backend on port 5000
```

## 4. Setup Frontend (in a new terminal)
```bash
cd frontend
npm install
npm start       # Starts frontend on port 3000
```

## 5. Test the Application

### Login Credentials:
**Admin**: admin@example.com / admin123
**User**: john@example.com / password123

### What to Try:
1. Browse products on home page
2. Click a product to view details
3. Add products to cart
4. Login with test account
5. Complete checkout
6. View order history

## 🎉 That's it!

Your e-commerce website is now running at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## Troubleshooting

**"Port 5000 already in use"**
- Kill the process: `lsof -ti:5000 | xargs kill -9` (macOS/Linux)
- Or change PORT in backend/.env

**"MongoDB connection failed"**
- Make sure MongoDB is running
- Check connection string in backend/.env

**"Module not found"**
- Delete node_modules and run `npm install` again
- Make sure you're in the correct directory

For detailed documentation, see README.md
