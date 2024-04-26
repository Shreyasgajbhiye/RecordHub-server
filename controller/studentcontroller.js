import Student from "../model/Student.model.js";
import Batch from "../model/Batch.model.js";
import Achievement from "../model/Achievement.model.js";
import mongoose from "mongoose";
import bcryptjs from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const verifyMail = async(req,res)=>{
  try {
    // const student = await Student.findById(req.params.id);
    // if (student) {
    //   await Student.updateOne({_id : req.params.id}, {
    //     $set: {
    //       isVerified: true
    //     }
    //   });
    //   res.status(201).json({message: "Email Verified successfully!"});
    // }else{
    //   res.status(401).json({message: "Student not found"});
    // }
    const updateInfo = await Student.updateOne({_id:req.query.id},{ $set:{
      isVerified: true
    }});
    console.log(updateInfo);
    res.status(201).json({message: "Email verified successfully!"});

  } catch (error) {
    console.log(error);
  }
};

function sendVerifyMail(email,user_id,fname)
{
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      requireTLS:true,
      // secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "abhishekchavan9394@gmail.com",
        pass: "mkfbgkircittelmz",
      },
    });

    const mailOptions = {
      from: "abhishekchavan9394@gmail.com",
      to:email,
      subject:"For verification mail",
      html: '<p>Hiii '+fname+' ,please <a href="http://localhost:8000/api/Student/Verificationlink?id='+user_id+'"> Click Here </a> to verify your mail.</p>'
    }
    transporter.sendMail(mailOptions,function(error,info){
      if(error)
      {
        console.log(error);
      }
      else
      {
        console.log("Email has been sent:- ",info.response);
      }
    })
  } catch (error) {
    console.log(error.message);
  }
}


export const signup = async (req, res, next) => {
  try {
    const { fname, mname, lname, email, password, year, batch } = req.body;

    const userExists = await Student.findOne({ email });

    if (userExists) {
      const err = new Error("User already exist");
      err.status = 400;
      next(err);
    }

    const batchId = await Batch.findOne({ name: batch });

      if (!batchId) {
        const err = new Error("Batch not found Please Ask you mentor to register first");
        err.status = 400;
        next(err);
      }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await Student.create({
      fname,
      mname,
      lname,
      email,
      password: hashedPassword,
      year,
      batch: batchId._id
    });

    if (user) {
      sendVerifyMail(email, user._id, fname);
      res.status(201).json({ message: "User registered successfully!" });
    } else {
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

    const user = await Student.findOne({ email });

    if (!user) {
      const err = new Error("Invalid email or password");
      err.status = 401;
      next(err);
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      const err = new Error("Invalid email or password");
      err.status = 401;
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
      if (user.isVerified) {
        if(user.isApproved){
          res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token
          });
        }else{
          const err = new Error("Not Approved yet");
          err.status = 401;
          next(err);
        }
      } else {
        const err = new Error("Not Verified yet");
        err.status = 401;
        next(err);
      }
    } else {
      const err = new Error("Invalid email or password");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    const err = new Error(error);
    err.status - 400;
    next(err);
  }
};

export const approveStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (student) {
      await Student.updateOne(
        { _id: req.params.id },
        {
          $set: {
            isApproved: true,
          },
        }
      );
      res.status(201).json({ message: "Student Approved successfully!" });
    } else {
      res.status(401).json({ message: "Student not found" });
      const err = new Error("Student not found");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    const err = new Error(error);
    err.status = 401;
    next(err);
  }
};

export const uploadAchievement = async (req, res, next) => {
  try {
    const {name, description, year, date, status, type} = req.body;
    
    if(req.file) {
      const pdf = req.file.path;
      const achievement = await Achievement.create({
        name,
        description,
        pdf,
        year,
        date,
        status,
        type,
        studentId: req.user.user
      });
      if (achievement) {
        res.status(201).json({ message: "Achievement uploaded successfully!" });
      } else {
        const err = new Error("Achievement not found");
        err.status = 401;
        next(err);
      }
    }

  } catch (error) {
    const err = new Error(error);
    err.status = 400;
    next(err);
  }
}

export const getMyAchievements = async (req, res, next) => {
  try {
    // let gfs;
    // const conn = mongoose.connection;
    // conn.once("open", () => {
    //   gfs = Grid(conn.db, mongoose.mongo);
    //   gfs.collection("uploads");
    // })
    const achievements = await Achievement.find({ studentId: req.params.id });
    if (achievements) {
      res.status(200).json(achievements);
    } else {
      const err = new Error("Achievements not found");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    const err = new Error(error);
    err.status = 400;
    next(err);
  }
}


