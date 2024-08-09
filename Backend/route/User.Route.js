import express from "express";
import { signup, login, logout, allUsers } from "../controller/UserController.js";
import secureRoute from "../middleware/SercureRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allUsers", secureRoute, allUsers);

export default router;
