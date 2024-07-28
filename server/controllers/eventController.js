import Event from "../models/eventModel.js";
import { z } from "zod";

const createEventSchema = z.object({
  userId: z.string({ required_error: "userId is required" }).min(1, {
    message: "userId is required",
  }),
  title: z.string({ required_error: "title is required" }).min(1, {
    message: "title is required",
  }),
  description: z.string({ required_error: "description is required" }).min(1, {
    message: "description is required",
  }),
  date: z.string({ required_error: "date is required" }).min(1, {
    message: "date is required",
  }),
  time: z.string({ required_error: "time is required" }).min(1, {
    message: "time is required",
  }),
  location: z.string({ required_error: "location is required" }).min(1, {
    message: "location is required",
  }),
});

export const createEvent = async (req, res) => {
  const { success, data, error } = createEventSchema.safeParse(req.body);
  try {
    if (!success) {
      return res
        .status(400)
        .json({ error: error.errors.map((e) => e.message).join(", ") });
    }
    const { userId, title, description, date, time, location } = data;
    if (!userId) {
      return res.status(400).json({ error: "Please Register or Login First" });
    }
    const newEvent = await Event.create({
      userId,
      title,
      description,
      date,
      time,
      location,
    });
    if (!newEvent) {
      return res.status(400).json({ error: "Error Creating Event" });
    }
    res
      .status(200)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllEvents = async (req, res) => {
  const userId = req.params.id;
  const { search = "", limit = "10", page = "1" } = req.query;
  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  const searchTerm = search.trim();

  try {
    if (!userId) {
      return res.status(400).json({ error: "Please Register or Login First" });
    }
    const query = {
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    };

    const totalEvents = await Event.countDocuments(query);
    const events = await Event.find(query)
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize);

    if (!events) {
      return res.status(400).json({ error: "Error Fetching Events" });
    }
    res.status(200).json({
      events,
      pagination: {
        total: totalEvents,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalEvents / pageSize),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  try {
    if (!eventId) {
      return res.status(400).json({ error: "Please Register or Login First" });
    }
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(400).json({ error: "Error Deleting Event" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateEvent = async (req, res) => {
  const { eventId, newEvent } = req.body;
  try {
    if (!eventId) {
      return res.status(400).json({ error: "Please Register or Login First" });
    }
    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });
    if (!updatedEvent) {
      return res.status(400).json({ error: "Error Updating Event" });
    }
    res.status(200).json({ message: "Event updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
