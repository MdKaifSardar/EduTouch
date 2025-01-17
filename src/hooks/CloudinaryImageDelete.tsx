import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteImageFromCloudinary = async (
  imageUrl: string
): Promise<string> => {
  if (!imageUrl) throw new Error("Image URL is required.");

  try {
    const matches = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
    if (!matches || matches.length < 2)
      throw new Error("Invalid Cloudinary image URL.");

    const publicId = matches[1];
    const response = await cloudinary.uploader.destroy(publicId);

    if (response.result !== "ok")
      throw new Error(`Failed to delete image: ${response.result}`);

    return `Image with public ID ${publicId} deleted successfully.`;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw new Error("Failed to delete image from Cloudinary.");
  }
};
