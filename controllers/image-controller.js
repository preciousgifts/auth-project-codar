import Image from "../utils/images.js";
import uploadToCloudinary from "../helper/cloudinaryHelper.js";
import fs from "fs";

const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required, Upload an image",
      });
    }

    //upload to cloudinary

    const { url, publicId } = await uploadToCloudinary(req.file.path);
    //store publicId and url in mongooseDB
    const newlyUploadedImage = new Image({
      url,
      public: true,
      uploadedBy: req.profileInfo.profileId,
    });

    await newlyUploadedImage.save();
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newlyUploadedImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const fetchImagesController = async (req, res) => {
  try {
    const image = await Image.find({});

    if (image) {
      res.status(200).json({
        success: true,
        data: image,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! please try again",
    });
  }
};

export { uploadImageController, fetchImagesController };
