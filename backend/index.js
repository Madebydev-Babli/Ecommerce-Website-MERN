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
      "http://localhost:5173",
      "http://localhost:5174",
      "https://your-frontend-name.onrender.com", // ✅ add your deployed frontend URL here later
      "https://yourfrontend.netlify.app"
    ],
    credentials: true,
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// ✅ Start server and connect to DB
app.listen(port, () => {
  console.log(✅ Server running on port ${port});
  ConnectDB();
});
