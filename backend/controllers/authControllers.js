
import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs'


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
  
  
  
