import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Student from "../model/Student.model.js";
import Mentor from "../model/Mentor.model.js";

export const protect = asyncHandler(async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (err) {
          const err = new Error("User isnotauthorized");
          err.status = 400;
          next(err);
        }

        req.user = decoded
        console.log(req.user)
        next();
      });

      if (!token) {
        const err = new Error("User has not provided Authorization TOken");
        err.status = 401;
        next(err);
      }
    } else {

      const err = new Error("User has not provided Authorization TOken");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    const err = new Error(error);
    err.status = 400;
    next(err);
  }
});


export const restrict = (role) => {
  return asyncHandler(async (req, res, next) => {
    console.log(role)
    if (role === "admin") {
      if (req.user.role === "admin") {
        next();
      } else {
        const err = new Error("Unauthorized");
        err.status = 401;
        next(err);
      }
      // next()
    } else if (role === "mentor") {
      if (req.user.role === "mentor") {
        next();
      } else {
        const err = new Error("Unauthorized");
        err.status = 401;
        next(err);
      }
    } else if (role === "student") {
      if (req.user.role === "student") {
        next();
      } else {
        const err = new Error("Unauthorized");
        err.status = 401;
        next(err);
      }
    }
  })};
  

//comment
