import { Schema, model, models } from "mongoose";

const TimeSchema = new Schema({
  name: { type: String, required: true },
  startTime: { type: Date, default: new Date() },
  endTime: { type: Date, default: new Date() },
});

const EventTimings =
  (models && models.EventTimings) || model("EventTimings", TimeSchema);
export default EventTimings;
