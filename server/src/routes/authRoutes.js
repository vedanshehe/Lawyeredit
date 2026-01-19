import express from "express";
const authRouter = express.Router();
import { Signup, login } from "../controllers/authcontroller.js";

authRouter.post("/register", Signup);
authRouter.post("/login", login);

export default authRouter;
