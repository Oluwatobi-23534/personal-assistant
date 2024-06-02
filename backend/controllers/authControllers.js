import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Signup Controller
export const signup = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check if the passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

// Signin Controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if the user exists
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return next(errorHandler(404, "User does not exist"));
  }

  // Check if the password is correct
  const isPasswordCorrect = bcryptjs.compareSync(
    password,
    existingUser.password
  );
  if (!isPasswordCorrect) {
    return next(errorHandler(400, "Invalid credentials"));
  }

  // User is authenticated
  try {
    // Here you might want to generate a token or start a session
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = existingUser._doc;
    res
      .cookie("access-token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie will expire after 7 days
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
