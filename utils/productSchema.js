import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    required: [true, "product name is required"],
    type: String,
    trim: true,
  },
  price: {
    required: [true, "Product price is required"],
    type: Number,
  },
  description: {
    required: [false, "Product description is optional "],
    type: String,
  },
  image: {
    required: [true, "Product image is required"],
    type: String,
  },
  category: {
    required: [true, "Prodict category is required"],
    type: String,
    enum: [
      "general",
      "electronics",
      "clothing",
      "accessories",
      "home",
      "beauty",
      "books",
      "sports",
      "toys",
      "food",
      "health",
      "drinks: [beverages, alcholic, groceries]",
    ],
    default: "general",
  },
  vendor: {
    required: [true, "Vendor is required"],
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Product", ProductSchema);
