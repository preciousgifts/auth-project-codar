import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },

    public: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Image", ImageSchema);

// module.exports = mongoose.model("Image", ImageSchema);
