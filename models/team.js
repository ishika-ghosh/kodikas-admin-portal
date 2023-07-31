import { Schema, model, models } from "mongoose";

const teamSchema = new Schema({
  teamName: {
    type: String,
    required: [true, "Team Name is required"],
    unique: [true, "Team Name already exists"],
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  teamMember: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  teamMemberConfirmation: {
    type: Boolean,
    default: false,
  },
  payment: {
    type: Boolean,
    default: false,
  },
});

const Team = (models && models.Team) || model("Team", teamSchema);
export default Team;
