import Session from "../models/userSessionModel.js";

export const logout = async (req, res) => {
  const { sessionToken } = req.body;

  try {
    const session = await Session.findOne({ sessionToken });
    if (!session) {
      return res.status(400).json({ error: "Session not found" });
    }

    session.logoutTime = Date.now();
    await session.save();

    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
