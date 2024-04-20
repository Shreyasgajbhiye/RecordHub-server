import Mentor from "../model/Mentor.model.js";
import generateToken from "../utils/generateTokens.js";
import bcryptjs from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { fname, mname, lname, email, password, batch } = req.body;

    const userExists = await Mentor.findOne({ email });

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
      batch,
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
    err.status = 400;
    next(err);
  }
};

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

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
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
