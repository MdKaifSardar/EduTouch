import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility function for uploading images to Cloudinary with folder option
export const uploadImageToCloudinary = async (
  image: File,
  folder: string
): Promise<string> => {
  const buffer = await image.arrayBuffer();
  const base64Image = Buffer.from(buffer).toString("base64");

  const cloudinaryResponse = await cloudinary.uploader.upload(
    `data:${image.type};base64,${base64Image}`,
    {
      folder: folder, // Folder in Cloudinary for organization
      resource_type: "image",
    }
  );

  return cloudinaryResponse.secure_url;
};
