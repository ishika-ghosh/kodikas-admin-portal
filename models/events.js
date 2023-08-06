import { Schema, model, models } from "mongoose";

const EventsSchema = new Schema(
  {
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
    payment: {
      type: Boolean,
      default: false,
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

const Event = (models && models.Event) || model("Event", EventsSchema);
export default Event;
