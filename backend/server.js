import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import Product from './models/Product.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('E-Commerce Automation Testing API is running...');
});

// Seed default products helper
const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const defaultProducts = [
        {
          name: 'Wireless Noise-Canceling Headphones',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
          description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
          category: 'Electronics'
        },
        {
          name: 'Minimalist Smart Watch',
          price: 149.50,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
          description: 'Sleek design smartwatch with heart rate monitoring, GPS, and custom watch faces.',
          category: 'Wearables'
        },
        {
          name: 'Classic Leather Backpack',
          price: 89.00,
          image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=600&q=80',
          description: 'Handcrafted genuine leather backpack with padded laptop sleeve and multiple pockets.',
          category: 'Accessories'
        },
        {
          name: 'Ergonomic Mechanical Keyboard',
          price: 120.00,
          image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
          description: 'RGB backlit mechanical keyboard with hot-swappable brown switches for typing comfort.',
          category: 'Electronics'
        },
        {
          name: 'Portable Bluetooth Speaker',
          price: 59.99,
          image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
          description: 'Waterproof outdoor Bluetooth speaker with rich bass and 24-hour playtime.',
          category: 'Electronics'
        }
      ];

      await Product.insertMany(defaultProducts);
      console.log('Database seeded with default products!');
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

// Seed database on server startup
seedProducts();

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
