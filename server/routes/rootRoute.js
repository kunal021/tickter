import express from "express";
import userRoute from "./userRoute.js";
import eventRoute from "./eventRoute.js";
import weatherRoute from "./weatherRoute.js";

const router = express.Router();

router.use("/", userRoute);
router.use("/", eventRoute);
router.use("/", weatherRoute);

export default router;
