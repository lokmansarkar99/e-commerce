import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from "cors"
import { connectDB } from "./controllers/prismaController.js";
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import  productRoutes  from './routes/productRoutes.js'
import categoyRoutes from './routes/categoryRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config();



const app = express();
const PORT = 3000;


// Cors
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

// Middlewares
app.use(express.json())
app.use(cookieParser())


// Routes
app.use('/api/auth',authRoutes )
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/category', categoyRoutes)
app.use('/api/address', addressRoutes)
app.use('/api/order', orderRoutes)





app.get("/", (req, res) => {
  res.send("Hello Express");
});



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
