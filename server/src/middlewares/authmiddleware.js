import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      const err = new Error("Not authorized, no token");
      err.statusCode = 401;
      throw err;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      const err = new Error("User not found");
      err.statusCode = 401;
      throw err;
    }

    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

export default authMiddleware;
