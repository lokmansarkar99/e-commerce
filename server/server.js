import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

import { connectDB } from "./controllers/prismaController.js";
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import  productRoutes  from './routes/productRoutes.js'
import categoyRoutes from './routes/categoryRoutes.js'

dotenv.config();

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json())
app.use(cookieParser())


// Routes
app.use('/api/auth',authRoutes )
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/category', categoyRoutes)




app.get("/", (req, res) => {
  res.send("Hello Express");
});



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
