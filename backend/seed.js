const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-canceling over-ear headphones with 30-hour battery life. Crystal clear sound quality with deep bass and comfortable ear cushions.',
    price: 149.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 50,
    rating: 4.5,
    numReviews: 128
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Track your health and fitness with this advanced smartwatch. Features heart rate monitoring, GPS, and water resistance.',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    stock: 75,
    rating: 4.7,
    numReviews: 243
  },
  {
    name: 'Leather Office Chair',
    description: 'Ergonomic executive chair with lumbar support and adjustable height. Premium leather upholstery for maximum comfort.',
    price: 299.99,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500',
    stock: 30,
    rating: 4.3,
    numReviews: 87
  },
  {
    name: 'Professional Camera Lens',
    description: '50mm f/1.8 prime lens for professional photography. Sharp images with beautiful bokeh effect.',
    price: 399.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1606462967108-f41a779e8e9f?w=500',
    stock: 25,
    rating: 4.8,
    numReviews: 156
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and breathable organic cotton t-shirt. Available in multiple colors. Perfect for casual wear.',
    price: 29.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    stock: 200,
    rating: 4.2,
    numReviews: 312
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.',
    price: 34.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    stock: 150,
    rating: 4.6,
    numReviews: 289
  },
  {
    name: 'Programming Book Bundle',
    description: 'Complete guide to modern web development including JavaScript, React, and Node.js. 3 books in one package.',
    price: 79.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    stock: 100,
    rating: 4.9,
    numReviews: 421
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Extra thick non-slip yoga mat with carrying strap. Perfect for yoga, pilates, and floor exercises.',
    price: 49.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    stock: 80,
    rating: 4.4,
    numReviews: 167
  },
  {
    name: 'Gaming Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with customizable keys. Tactile switches for perfect gaming experience.',
    price: 129.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    stock: 60,
    rating: 4.7,
    numReviews: 198
  },
  {
    name: 'Indoor Plant Collection',
    description: 'Set of 3 easy-care indoor plants including pothos, snake plant, and peace lily. Comes with decorative pots.',
    price: 59.99,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=500',
    stock: 45,
    rating: 4.5,
    numReviews: 134
  },
  {
    name: 'Running Shoes Pro',
    description: 'Lightweight running shoes with superior cushioning and breathable mesh upper. Perfect for long-distance running.',
    price: 119.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    stock: 120,
    rating: 4.6,
    numReviews: 276
  },
  {
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with thermal carafe. Brews perfect coffee every time with adjustable strength settings.',
    price: 89.99,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    stock: 70,
    rating: 4.3,
    numReviews: 203
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Insert products
    await Product.insertMany(products);
    console.log('Products seeded successfully!');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Admin user created successfully!');

    // Create regular user
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user'
    });
    console.log('Regular user created successfully!');

    console.log('\n=== Seed Data Summary ===');
    console.log(`Products added: ${products.length}`);
    console.log('\nDefault Users:');
    console.log('Admin - Email: admin@example.com | Password: admin123');
    console.log('User - Email: john@example.com | Password: password123');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
