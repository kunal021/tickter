import express from "express";
import { signup } from "../controllers/signupController.js";
import { login } from "../controllers/loginController.js";
import { logout } from "../controllers/logoutController.js";
import { getSession } from "../controllers/sessionController.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/sessions", getSession);

export default router;
