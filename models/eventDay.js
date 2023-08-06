import { Schema, model, models } from "mongoose";

const EventsDaySchema = new Schema(
  {
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
    attendance: {
      type: Boolean,
      default: false,
    },
    first: {
      type: Boolean,
      default: false,
    },
    second: {
      type: Boolean,
      default: false,
    },
    lunch: {
      type: Boolean,
      default: false,
    },
    third: {
      type: Boolean,
      default: false,
    },
    fourth: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const EventDay =
  (models && models.EventDay) || model("EventDay", EventsDaySchema);
export default EventDay;
