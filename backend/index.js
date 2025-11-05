const express = require('express');
const app = express();
const dotenv = require('dotenv');
const ConnectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');
const productRoute = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const aiRouter = require('./routes/aiRoutes');

// Load environment variables
dotenv.config();

// ✅ Use Render’s dynamic port OR fallback to local 5000
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://ecommerce-website-mern-frontend-vc2w.onrender.com",
      "https://ecommerce-website-mern-1-admin.onrender.com",
    ],
    credentials: true,
  })
);


app.use('/api/auth',authRoutes);
app.use('/api/user',userRoute);
app.use('/api/product',productRoute);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/ai',aiRouter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// ✅ Start server and connect to DB
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  ConnectDB();
});
