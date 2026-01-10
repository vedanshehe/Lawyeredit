const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const debates = [];

router.post("/", authMiddleware, (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "topic is required" });
  }

  const debate = {
    id: Date.now().toString(),
    topic,
    createdBy: req.user.username,
    opponent: null,
    status: "waiting",
  };

  debates.push(debate);

  res.json({
    message: "debate created",
    debate,
  });
});

router.post("/:id/invite", authMiddleware, (req, res) => {
  const { id } = req.params;
  const { opponentUsername } = req.body;

  const debate = debates.find(d => d.id === id);

  if (!debate) {
    return res.status(404).json({ error: "debate not found" });
  }

  if (debate.createdBy !== req.user.username) {
    return res.status(403).json({ error: "only creator can invite" });
  }

  debate.opponent = opponentUsername;
  debate.status = "active";

  res.json({
    message: "opponent invited",
    debate,
  });
});

module.exports = router;
