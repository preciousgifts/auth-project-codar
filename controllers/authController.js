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
      secret_question_1,
      secret_question_2,
      secret_question_3,
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
      !phone ||
      !secret_question_1 ||
      !secret_question_2 ||
      !secret_question_3
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

    // const your_mother_maiden_name = secret_question;

    const newProfile = new Profile({
      username,
      password: bcrypt.hashSync(password, 6), // Hashing the password with a minimum length of 6 characters
      first_name,
      middle_name,
      last_name,
      email,
      phone,
      secretQuestion1: secret_question_1,
      secretQuestion2: secret_question_2,
      secretQuestion3: secret_question_3,
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

const passwordReset = async (req, res) => {
  try {
    const {
      username,
      secret_question_1,
      secret_question_2,
      secret_question_3,
      new_password,
    } = req.body;

    if (
      !username ||
      !secret_question_1 ||
      !secret_question_2 ||
      !secret_question_3 ||
      !new_password
    ) {
      res.status(400).json({
        success: false,
        message: "Username, secret question and new password are required",
      });
    }

    const checkUser = await Profile.findOne({
      username,
    });

    //Check if profile exists
    if (!checkUser) {
      res.status(400).json({
        success: false,
        message: "User does not exist. Kindly check and try again",
      });
    }

    //validate the secret questions (if correct)
    if (checkUser.secretQuestion1 !== secret_question_1) {
      res.status(400).json({
        success: false,
        message: "Secret question 1's answer is incorrect",
      });
    }
    if (checkUser.secretQuestion2 !== secret_question_2) {
      res.status(400).json({
        success: false,
        message: "Secret question 2's answer is incorrect",
      });
    }
    if (checkUser.secretQuestion3 !== secret_question_3) {
      res.status(400).json({
        success: false,
        message: "Secret question 3's answer is incorrect",
      });
    }

    const updatedProfile = await Profile.updateOne(
      {
        username: username,
        secretQuestion1: secret_question_1,
        secretQuestion2: secret_question_2,
        secretQuestion3: secret_question_3,
      },
      { $set: { password: bcrypt.hashSync(new_password, 8) } }
    );

    res.status(201).json({
      success: true,
      message: "Record updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
      error: error.message,
    });
  }
};

export { registerUser, loginUser, passwordReset };
