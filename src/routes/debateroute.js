const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "topic is required" });
  }

  res.json({
    message: "debate created",
    debate: {
      id: Date.now(),
      topic,
      createdBy: req.user.username,
    },
  });
});

module.exports = router;
