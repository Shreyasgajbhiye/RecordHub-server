import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Student from "../model/Student.model.js";
import Mentor from "../model/Mentor.model.js";

export const studentProtect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.headers.authorization;

  console.log(token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Student.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const mentorProtect = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User isnotauthorized");
      }
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User has not provided Authorization TOken");
    }
  }
});

//comment
