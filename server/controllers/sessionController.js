import Session from "../models/userSessionModel.js";

export const getSession = async (req, res) => {
  const { limit = "10", page = "1" } = req.query;
  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  try {
    const totalEvents = await Session.countDocuments();
    const allSessions = await Session.find()
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize);
    if (!allSessions) {
      return res.status(400).json({ error: "Error Fetching Sessions" });
    }
    res.status(200).json({
      sessions: allSessions,
      pagination: {
        total: totalEvents,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalEvents / pageSize),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
