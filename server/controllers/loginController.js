import supabase from "../utils/supabase.js";
import User from "../models/userModel.js";
import Session from "../models/userSessionModel.js";
import crypto from "crypto";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const { user } = data;
    if (!user || !user.id) {
      return res
        .status(400)
        .json({ error: "User not found in Supabase response" });
    }

    const sessionToken = crypto.randomBytes(64).toString("hex");

    const ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const session = await Session.create({
      userId: user.id,
      ipAddress,
      sessionToken,
    });

    const existingUser = await User.findOne({ supabaseUserId: user.id });
    if (!existingUser) {
      await User.create({
        email,
        supabaseUserId: user.id,
        name: user.user_metadata?.name || "",
      });
    }

    res.status(200).json({
      message: "User logged in successfully",
      data,
      session,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
