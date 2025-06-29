
import { verifyAuth } from "../middleware/verifyAuth.js";
import { loginUser, logoutUser, registerUser } from "../controllers/authController.js";
import express from "express";
import { isAdmin, isUser } from "../middleware/roleAuth.js";


const router = express.Router();
router.post('/register', registerUser);        // Public
router.post('/login', loginUser);              // Public
router.post('/logout', verifyAuth, logoutUser); // Protected


export default router;
