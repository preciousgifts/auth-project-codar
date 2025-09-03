import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  username: {
    required: [true, "Username is required"],
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    required: [true, "Password is required"],
    type: String,
    trim: true,
    minlenth: [6, "Password must be at least 6 characters long"],
    // select: false, // This will not return the password in queries
  },
  first_name: {
    required: [true, "First name is required:"],
    type: String,
    trim: true,
  },
  middle_name: {
    required: [false, "Middle name is optional"],
    type: String,
    trim: true,
  },
  last_name: {
    required: [true, "Last name is Required"],
    type: String,
    trim: true,
  },
  email: {
    required: [true, "Email is required"],
    type: String,
    trim: true,
    unique: true,
  },
  phone: {
    required: [true, "Phone number is required"],
    type: String,
    trim: true,
    // unique: true,
  },
  address: {
    required: [false, "Address is optional"],
    type: String,
    trim: true,
  },
  secretQuestion1: {
    required: [true, "Secret question is required"],
    type: String,
    trim: true,
  },
  secretQuestion2: {
    required: [true, "Secret question is required"],
    type: String,
    trim: true,
  },
  secretQuestion3: {
    required: [true, "Secret question is required"],
    type: String,
    trim: true,
  },
  role: {
    required: [true, "Role is required"],
    type: String,
    enum: ["user", "admin", "super_admin", "front_desk"],
    default: "user",
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

export default mongoose.model("Profile", profileSchema);
