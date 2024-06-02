// User Model
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    porfilePicture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGdAOWdZSbW8kVEqzA2noZPKVaMCZZZZ2tpA&s",
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
