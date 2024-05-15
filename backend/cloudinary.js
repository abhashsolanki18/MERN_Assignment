import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloud = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    console.log("file uploaded", result.url);
    fs.unlinkSync(localFilePath); 
    return result.url; 
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log(error);
    throw error;  
  }
};

export { uploadOnCloud };
