import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return {
      url: result.secure_url,
      publicId: result.publicId,
    };
  } catch (error) {
    console.error("Error while uploading to cloudinary", error);
    throw new Error("Error while uploading file");
  }
};

export default uploadToCloudinary;
