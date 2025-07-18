// middleware/uploadImage.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../utils/cloudinary.js"; 

// Setup CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce_products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

export default upload;
