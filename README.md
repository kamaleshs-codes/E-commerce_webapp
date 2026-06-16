# ShopHub - Full Stack E-Commerce Website

A modern, fully functional e-commerce platform built with React.js, Node.js, Express, and MongoDB.

## 🚀 Features

### User Features
- **User Authentication**: Secure login and registration with JWT tokens
- **Product Browsing**: View products by category with filtering options
- **Product Details**: Detailed product pages with images, descriptions, and stock info
- **Shopping Cart**: Add, remove, and update product quantities
- **Checkout**: Complete order placement with shipping information
- **Order History**: View all past orders with detailed information
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Admin Features (Backend)
- **Product Management**: Full CRUD operations for products
- **User Management**: Secure user authentication system
- **Order Management**: Track and manage customer orders

### Technical Features
- JWT-based authentication
- Protected routes for authenticated users
- RESTful API architecture
- MongoDB database with Mongoose ODM
- React Context API for state management
- Modern, clean UI with custom CSS
- Responsive design

## 📁 Project Structure

```
ecommerce-project/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User model
│   │   ├── Product.js            # Product model
│   │   └── Order.js              # Order model
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── productRoutes.js      # Product CRUD routes
│   │   └── orderRoutes.js        # Order management routes
│   ├── .env                      # Environment variables
│   ├── .env.example              # Example environment file
│   ├── package.json              # Backend dependencies
│   ├── seed.js                   # Database seeding script
│   └── server.js                 # Express server entry point
│
└── frontend/
    ├── public/
    │   └── index.html            # HTML template
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js         # Navigation component
    │   │   └── ProductCard.js    # Product card component
    │   ├── context/
    │   │   ├── AuthContext.js    # Authentication context
    │   │   └── CartContext.js    # Shopping cart context
    │   ├── pages/
    │   │   ├── Home.js           # Home page with product listing
    │   │   ├── ProductDetail.js  # Product detail page
    │   │   ├── Cart.js           # Shopping cart page
    │   │   ├── Login.js          # Login page
    │   │   ├── Register.js       # Registration page
    │   │   ├── Checkout.js       # Checkout page
    │   │   └── Orders.js         # Order history page
    │   ├── utils/
    │   │   └── api.js            # Axios API configuration
    │   ├── App.js                # Main App component with routing
    │   ├── App.css               # Global styles
    │   └── index.js              # React entry point
    └── package.json              # Frontend dependencies
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Step 1: Clone or Download the Project
```bash
cd ecommerce-project
```

### Step 2: Setup MongoDB

Make sure MongoDB is installed and running on your system.

**For macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**For Ubuntu/Debian:**
```bash
sudo systemctl start mongod
```

**For Windows:**
Start MongoDB from the Services panel or run:
```bash
net start MongoDB
```

### Step 3: Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

The `.env` file is already created with default values. If you need to modify it:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=ecommerce_super_secret_key_2024
NODE_ENV=development
```

Seed the database with sample products and users:
```bash
npm run seed
```

This will create:
- **12 sample products** across various categories
- **Admin user**: admin@example.com / admin123
- **Regular user**: john@example.com / password123

Start the backend server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The backend API will be running at `http://localhost:5000`

### Step 4: Frontend Setup

Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the React development server:
```bash
npm start
```

The frontend will automatically open at `http://localhost:3000`

## 🎯 Usage

### Default User Accounts

After running the seed script, you can login with:

**Admin Account:**
- Email: admin@example.com
- Password: admin123
- Role: Admin (can manage products)

**Regular User Account:**
- Email: john@example.com
- Password: password123
- Role: User (can shop and place orders)

### User Flow

1. **Browse Products**: Visit the home page to see all products
2. **Filter by Category**: Use category buttons to filter products
3. **View Product Details**: Click any product to see detailed information
4. **Add to Cart**: Add products to your shopping cart
5. **Register/Login**: Create an account or login
6. **Checkout**: Fill in shipping information and place order
7. **View Orders**: Check your order history

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

#### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/myorders` - Get user's orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id/status` - Update order status (protected)

## 🔧 API Testing with Postman/Insomnia

### 1. Register a User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

Save the returned `token` for authenticated requests.

### 3. Get Products
```
GET http://localhost:5000/api/products
```

### 4. Create Order (Protected)
```
POST http://localhost:5000/api/orders
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "orderItems": [
    {
      "product": "PRODUCT_ID",
      "name": "Product Name",
      "quantity": 2,
      "price": 99.99,
      "image": "image_url"
    }
  ],
  "shippingAddress": {
    "address": "123 Main St",
    "city": "New York",
    "postalCode": "10001",
    "country": "USA"
  },
  "totalPrice": 219.98
}
```

## 🎨 Customization

### Modify Product Categories
Edit the categories in `backend/models/Product.js`:
```javascript
category: {
  type: String,
  enum: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Food', 'Other']
}
```

### Change Styling
All styles are in `frontend/src/App.css`. Modify CSS variables for quick theme changes:
```css
:root {
  --primary: #0f0f0f;
  --secondary: #e63946;
  --accent: #f77f00;
  /* ... */
}
```

### Add More Products
Edit `backend/seed.js` to add more sample products, then run:
```bash
npm run seed
```

## 📦 Building for Production

### Backend
The backend is production-ready. For deployment:

1. Set environment variables on your hosting platform
2. Update `MONGODB_URI` to your production MongoDB URL
3. Change `JWT_SECRET` to a secure random string
4. Set `NODE_ENV=production`

### Frontend
Build the React app:
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🚀 Future Enhancements

Ready to add:
- Payment gateway integration (Stripe, PayPal)
- Product reviews and ratings
- Wishlist functionality
- Advanced search with filters
- Admin dashboard UI
- Email notifications
- Image upload for products
- Order tracking
- Discount codes/coupons
- Multiple product images

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `brew services list` (macOS) or `sudo systemctl status mongod` (Linux)
- Check MongoDB URI in `.env` file

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: React will prompt to use a different port automatically

### CORS Errors
- Ensure backend is running on port 5000
- Check `proxy` setting in `frontend/package.json`

### JWT Authentication Issues
- Make sure token is stored in localStorage
- Check token format: `Bearer YOUR_TOKEN`

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📧 Support

For issues or questions, please check the troubleshooting section or create an issue in the repository.

---

**Happy Shopping! 🛍️**
