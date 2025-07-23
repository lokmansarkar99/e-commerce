import express from "express";
import {
  addAddressController,
  getUserAddressesController,
  getAddressByIdController,
  updateAddressController,
  deleteAddressController,
  setDefaultAddressController,
} from   "../controllers/addressController.js";
import { isUser } from "../middleware/roleAuth.js";
import { verifyAuth } from "../middleware/verifyAuth.js";


const router = express.Router();



router.post("/" ,verifyAuth,isUser,  addAddressController);
router.get("/",verifyAuth,isUser, getUserAddressesController);
router.get("/:id",verifyAuth,isUser, getAddressByIdController);
router.put("/:id",verifyAuth,isUser, updateAddressController); 
router.delete("/:id",verifyAuth,isUser, deleteAddressController);
router.patch("/set-default/:id",verifyAuth,isUser, setDefaultAddressController);

export default router;
