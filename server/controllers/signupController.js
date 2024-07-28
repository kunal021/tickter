import supabase from "../utils/supabase.js";
import User from "../models/userModel.js";
import Session from "../models/userSessionModel.js";
import crypto from "crypto";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error) {
      if (error.message.includes("Email rate limit exceeded")) {
        return res
          .status(429)
          .json({ error: "Too many requests. Please try again later." });
      }
      return res.status(400).json({ error: error.message });
    }

    const { user } = data;
    if (!user || !user.id) {
      return res
        .status(400)
        .json({ error: "User ID not found in Supabase response" });
    }

    const sessionToken = crypto.randomBytes(64).toString("hex");

    const ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const session = await Session.create({
      userId: user.id,
      ipAddress,
      sessionToken,
    });

    const newUser = await User.create({
      email,
      supabaseUserId: user.id,
      name,
    });

    res
      .status(200)
      .json({ message: "User signed up successfully", data, session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
