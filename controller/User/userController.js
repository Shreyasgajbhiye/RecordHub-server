
import Student from '../../model/User/User.js'
import generateToken from '../../utils/generateTokens.js';
import bcryptjs from 'bcrypt'
import jwt from 'jsonwebtoken';

export const signup = (async (req, res) => {
  const { name, email, password, year } = req.body;

  const userExists = await Student.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcryptjs.hash(password, 10)

  const user = await Student.create({
    name,
    email,
    password: hashedPassword,
    year
  });



  if (user) {
    res.status(201).json({ message: "User registered successfully!" });
  } else {
    res.status(400).json({ error: "Registration failed" });
  }
});



export const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await Student.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const passwordMatch = await bcryptjs.compare(password, user.password)

  if (!passwordMatch) {
    return res.status(401).json({ message: "Authentication failed" })
  }

  if (user) {
    const token = generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
