
import express from 'express'
import { verifyAuth } from "../middleware/verifyAuth.js";
import { isAdmin, isUser } from "../middleware/roleAuth.js";
import { deleteUser, getAllUsers, updateUserProfile, userProfile } from "../controllers/userController.js";


const router = express.Router();
router.get('/me', verifyAuth,  userProfile);        
router.put('/update', verifyAuth,  updateUserProfile);     

// Admin Routes
router.get('/all',verifyAuth, isAdmin,  getAllUsers)
router.delete('/delete/:id',verifyAuth, isAdmin,  deleteUser )


export default router;
