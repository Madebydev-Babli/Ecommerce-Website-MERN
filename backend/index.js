const express = require('express');
const app = express();
const dotenv = require('dotenv')
const ConnectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');
const productRoute = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');


dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174"],
    credentials:true
}))

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoute);
app.use('/api/product',productRoute);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);



app.listen(port,()=>{
    console.log("Hey I am running the backend");
    ConnectDB();
})