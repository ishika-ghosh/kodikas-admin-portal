import { Schema, model, models } from "mongoose";

const paymentSchema = new Schema(
  {
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

const Payment = (models && models.Payment) || model("Payment", paymentSchema);
export default Payment;
