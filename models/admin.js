import { Schema, model, models } from "mongoose";

const adminSchema = new Schema(
  {
    adminType: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Admin = (models && models.Admin) || model("Admin", adminSchema);
export default Admin;
