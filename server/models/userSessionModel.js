import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  loginTime: { type: Date, default: Date.now },
  logoutTime: { type: Date },
  ipAddress: { type: String },
  sessionToken: { type: String, required: true },
});

const Session = mongoose.model("Session", sessionSchema);
export default Session;
