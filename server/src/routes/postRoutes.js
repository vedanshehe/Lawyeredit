import express from "express";
import { createPost,getPosts,getPostById} from "../controllers/postcontroller.js";
import authMiddleware from "../middlewares/authmiddleware.js";
import { deletePost } from "../controllers/postcontroller.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", authMiddleware, createPost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
