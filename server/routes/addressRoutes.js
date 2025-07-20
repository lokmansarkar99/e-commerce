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


const router = express.Router();

// router.use(isUser)

router.post("/", addAddressController);
router.get("/", getUserAddressesController);
router.get("/:id", getAddressByIdController);
router.put("/:id", updateAddressController);
router.delete("/:id", deleteAddressController);
router.patch("/set-default/:id", setDefaultAddressController);

export default router;
