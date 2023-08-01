import { Schema, model, models } from "mongoose";

const adminSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, "userName already exists"],
      required: [true, "Team Name is required"],
    },
    password: {
      type: String,
      unique: [true, "userName already exists"],
      required: [true, "Team Name is required"],
    },
    isSuperAdmin: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Admin = (models && models.Admin) || model("Admin", adminSchema);
export default Admin;
