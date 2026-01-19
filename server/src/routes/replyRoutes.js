import express from "express";
import {
  createReply,
  getRepliesForPost
} from "../controllers/replycontroller.js";

const router = express.Router();

router.post("/", createReply);
router.get("/post/:postId", getRepliesForPost);

export default router;
