import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  supabaseUserId: { type: String, required: true },
  name: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

export default User;
