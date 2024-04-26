import Admin from "../model/Admin.model.js";
import Batch from "../model/Batch.model.js";
import Mentor from "../model/Mentor.model.js"
import Student from "../model/Student.model.js"
import generateToken from "../utils/generateTokens.js";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    try {
      const { fname, mname, lname, email, password } = req.body;
  
      const userExists = await Admin.findOne({ email });
  
      if (userExists) {
        const err = new Error("Admin already exists");
        err.status = 400;
        next(err);
      }
  
      const hashedPassword = await bcryptjs.hash(password, 10);
  
      const user = await Admin.create({
        fname,
        mname,
        lname,
        email,
        password: hashedPassword,
      });
  
      if (user) {
        res.status(201).json({ message: "User registered successfully!" , user});
      } else {
        res.status(400);
        const err = new Error("Registration failed");
        err.status = 400;
        next(err);
      }
    } catch (error) {
      const err = new Error(error);
      err.status = 400;
      next(err);
    }
  };

  export const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      const user = await Admin.findOne({ email });
  
      if (!user) {
        const err = new Error("Invalid email or password");
        err.status = 400;
        next(err);
      }
  
      const passwordMatch = await bcryptjs.compare(password, user.password);
  
      if (!passwordMatch) {
        const err = new Error("Invalid email or password");
        err.status = 400;
        next(err);
      }

      const token = jwt.sign(
        {
          user: user._id,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      )
  
      if (user) {
        res.status(200).json({
          _id: user._id,
          name: user.fname,
          email: user.email,
          role: user.role,
          token: token
        });
      } else {
        const err = new Error("Invalid email or password");
        err.status = 400;
        next(err);
      }
    } catch (error) {
      const err = new Error(error);
      err.status = 400;
      next(err);
    }
  };
  
  export const registerBatch = async (req, res, next) => {
    try {
      const { name } = req.body;
      const batchExists = await Batch.findOne({ name });

      if(batchExists) {
        const err = new Error("Batch already exists");
        err.status = 400;
        next(err);
      }

      const batch = await Batch.create({ name });

      if(batch) {
        res.status(201).json({ message: "Batch registered successfully!" });
      }
    }catch{
      const err = new Error(error);
      err.status = 400;
      next(err);
    }
  }

  export const addMentor = async (req, res, next) => {
    try {
      const { fname, mname, lname, email, password, batch } = req.body;
  
      const userExists = await Mentor.findOne({ email });
      const batchId = await Batch.findOne({ name: batch });

      if (!batchId) {
        const err = new Error("Batch not found Please register first");
        err.status = 400;
        next(err);
      }
  
      if (userExists) {
        const err = new Error("Mentor already exists");
        err.status = 400;
        next(err);
      }
  
      const hashedPassword = await bcryptjs.hash(password, 10);

  
      const user = await Mentor.create({
        fname,
        mname,
        lname,
        email,
        password: hashedPassword,
        batch: batchId._id
      });
  
      if (user) {
        res.status(201).json({ message: "User registered successfully!" });
      } else {
        res.status(400);
        const err = new Error("Registration failed");
        err.status = 400;
        next(err);
      }
    } catch (error) {
      const err = new Error(error);
      console.log(error)
      err.status = 400;
      next(err);
    }
  }

  export const getAllMentors = async (req, res, next) => {
    try {
      const mentors = await Mentor.find({});
      res.status(200).json(mentors);
    } catch (error) {
      const err = new Error(error);
      err.status = 401;
      next(err);
    }
  }

  export const getAllStudents = async (req, res, next) => {
    try {
      const students = await Student.find({});
      res.status(200).json(students);
    } catch (error) {
      const err = new Error(error);
      err.status = 401;
      next(err);
    }
  }
