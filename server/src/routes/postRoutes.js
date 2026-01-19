import express from "express";
import { createPost,getAllPosts,getPostById} from "../controllers/postcontroller.js";
import authMiddleware from "../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", authMiddleware, createPost);

export default router;
