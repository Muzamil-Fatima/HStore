import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //Read JWT from 'jwt' cookie

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorzed, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorzed, no token");
  }
});

// Check if user is Admin

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};

export { authenticate, authorizeAdmin };
