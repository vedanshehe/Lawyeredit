const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/authroute");
app.use("/auth", authRoutes);

const authMiddleware = require("./middlewares/authMiddleware");

app.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "you are authenticated",
    user: req.user,
  });
});

const debateRoutes = require("./routes/debateroute");
app.use("/debates", debateRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
