import express from "express";
import {
  createEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/event", createEvent);
router.get("/events/:id", getAllEvents);
router.patch("/event/:id", updateEvent);
router.delete("/event/:id", deleteEvent);

export default router;
