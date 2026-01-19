import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/usermodel.js";

// jwt generation
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};


export const Signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      const err = new Error("All fields are required");
      err.statusCode = 400;
      throw err;
    }

    const userExists = await User.findOne({ email });
    if (userExists == true) {
      const err = new Error("User already exists");
      err.statusCode = 400;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

//login controller
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("Email and password required");
      err.statusCode = 400;
      throw err;
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      throw err;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      throw err;
    }

    res.json({
      success: true,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};
