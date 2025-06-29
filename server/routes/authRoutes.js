
import { verifyAuth } from "../middleware/verifyAuth.js";
import { loginUser, logoutUser, registerUser } from "../controllers/authController.js";
import express from "express";


const router = express.Router();
router.post('/register', registerUser)
router.post('/login', verifyAuth,  loginUser)
router.post('/logout', logoutUser)


export default router;
