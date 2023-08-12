import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  image: {
    type: String,
  },
  year: {
    type: Number,
  },
  department: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
});

const User = (models && models.User) || model("User", userSchema);
export default User;
