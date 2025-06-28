import express from "express";
import { connectDB } from "./controllers/prismaController.js";

import authRoutes from './routes/authRoutes.js'

const app = express();
const PORT = 3000;
app.use(express.json())
app.use('/api/auth',authRoutes )



app.get("/", (req, res) => {
  res.send("Hello Express");
});



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
