import Achievement from "../model/Achievement.model.js";
import Mentor from "../model/Mentor.model.js";
import Student from "../model/Student.model.js";
import generateToken from "../utils/generateTokens.js";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Mentor.findOne({ email });

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
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
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

export const getAllStudents = async (req, res, next) => {
  try {
    const id = req.user.user
    const currentMentor = await Mentor.findOne({ _id: id });
    if(!currentMentor){ 
      const err = new Error("Mentor Not found");
      err.status = 400;
      next(err);
    }
    const batchId = currentMentor.batch
    const students = await Student.find({batch: {$in: batchId} });
    res.status(200).json(students);
  } catch (error) {
    const err = new Error(error);
    err.status = 401;
    next(err);
  }
};

export const getAllTechStudents = async (req, res, next) => {
  try {
    const id = req.user.user
    const currentMentor = await Mentor.findOne({ _id: id });
    if(currentMentor){
      const batchId = currentMentor.batch
      const students = await Student.find({batch: {$in: batchId}})
      .populate("achievement")

      const techStudents = students.map(student => 
      {
        return {
          _id: student._id,
          fname: student.fname,
          mname: student.mname,
          lname: student.lname,
          email: student.email,
          achievement: student.achievement.filter(achievement => achievement.type === "tech")
        }
      }
      )
      res.status(200).json(techStudents);
    }else{
      const err = new Error("Mentor Not found");
      err.status = 400;
      next(err);
    }
  } catch (error) {
    const err = new Error(error);
    err.status = 401;
    next(err);
  }
}
export const getAllNonTechStudents = async (req, res, next) => {
  try {
    const id = req.user.user
    const currentMentor = await Mentor.findOne({ _id: id });
    if(currentMentor){
      const batchId = currentMentor.batch
      const students = await Student.find({batch: {$in: batchId}})
      .populate("achievement")

      const techStudents = students.map(student => 
      {
        return {
          _id: student._id,
          fname: student.fname,
          mname: student.mname,
          lname: student.lname,
          email: student.email,
          achievement: student.achievement.filter(achievement => achievement.type !== "tech")
        }
      }
      )
      res.status(200).json(techStudents);
    }else{
      const err = new Error("Mentor Not found");
      err.status = 400;
      next(err);
    }
  } catch (error) {
    const err = new Error(error);
    err.status = 401;
    next(err);
  }
}

