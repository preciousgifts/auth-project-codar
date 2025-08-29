import Profile from "../utils/authSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const registerUser = async (req, res) => {
  try {
    const {
      username,
      password,
      first_name,
      middle_name,
      last_name,
      email,
      phone,
      address,
      role,
    } = req.body;

    const checkExistingUser = await Profile.findOne({
      $or: [{ username }, { email }],
    }); // can also use and if we're to validate two things ..
    if (
      !username ||
      !password ||
      !first_name ||
      !last_name ||
      !email ||
      !phone
    ) {
      res.status(400).json({
        success: false,
        message: "All fields are required except middle name and address",
      });
    }

    if (checkExistingUser) {
      res.status(400).json({
        success: false,
        message: "Username or email already exist. Kindly check and retry",
      });
    }

    const newProfile = new Profile({
      username,
      password: bcrypt.hashSync(password, 6), // Hashing the password with a minimum length of 6 characters
      first_name,
      middle_name,
      last_name,
      email,
      phone,
      address,
      role: role || "user",
    });

    const savedProfile = await newProfile.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: savedProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong creating the user",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      success: false,
      message: "Username/email and password is required",
    });
  }

  const profile = await Profile.findOne({ username });

  if (!profile) {
    res.status(400).json({
      success: false,
      messgae: "Username does not exist. Kindly register to proceed",
    });
  }

  let validPass = false;

  if (profile) {
    validPass = await bcrypt.compare(password, profile.password);
  }

  if (!validPass) {
    res.status(400).json({
      success: false,
      message: "Wrong password, kindly check and retry",
    });
  }

  // Create JWT token
  const token = jwt.sign(
    { profileId: profile._id, username: profile.username, role: profile.role },
    SECRET_KEY,
    {
      expiresIn: process.env.SESSION_TIME,
    }
  );

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    username: profile.username,
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
    role: profile.role,
  });
};

export { registerUser, loginUser };
