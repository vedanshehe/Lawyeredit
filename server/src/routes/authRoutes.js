import express from "express";
import { Signup, login } from "../controllers/authcontroller.js";

const authRouter = express.Router();

authRouter.post("/register", Signup);
authRouter.post("/login", login);

export default authRouter;
