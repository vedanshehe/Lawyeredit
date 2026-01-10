const debate = [];
const { signToken } = require("../utils/jwt");  
const bcrypt = require("bcrypt");

// TEMP in-memory store (server restart = data gone)
const users = [];

exports.register = async (req, res) => {
  const { username, password } = req.body;

  // 1. validation
  if (!username || !password) {
    return res.status(400).json({
      error: "username and password are required",
    });
  }

  // 2. check if user already exists
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({
      error: "user already exists",
    });
  }

  // 3. hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. store user
  users.push({
    id: users.length + 1,
    username,
    password: hashedPassword,
  });

  // 5. response
  res.json({
    message: "user registered successfully",
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body || {};

  // validation
  if (!username || !password) {
    return res.status(400).json({
      error: "username and password are required",
    });
  }

  // find user
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({
      error: "invalid credentials",
    });
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      error: "invalid credentials",
    });
  }

  // success
const token = signToken({
  id: user.id,
  username: user.username,
});

res.json({
  message: "login successful",
  token,
});
};

