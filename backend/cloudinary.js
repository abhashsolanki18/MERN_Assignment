import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloud = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
   await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    console.log("file uploaded");
  } catch (error) {
    console.log(error)
  }
};