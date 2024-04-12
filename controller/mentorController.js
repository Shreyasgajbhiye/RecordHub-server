
import Mentor from '../model/Mentor.model.js'
import generateToken from '../utils/generateTokens.js';
import bcryptjs from 'bcrypt'

export const signup = (async (req, res) => {
  const { fname, mname, lname, email, password, batch } = req.body;

  const userExists = await Mentor.findOne({ email });

  if (userExists) {
    res.status(400)
    // .json({ message: "User already exists" });
    throw new Error("Mentor already exists");
  }

  const hashedPassword = await bcryptjs.hash(password, 10)

  const user = await Mentor.create({
    fname,
    mname,
    lname,
    email,
    password: hashedPassword,
    batch
  });



  if (user) {
    res.status(201).json({ message: "User registered successfully!" });
  } else {
    res.status(400)
    // .json({ error: "Registration failed" });
    throw new Error("Registration failed");
  }
});



export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Mentor.findOne({ email });

  if (!user) {
    return res.status(401)
    // .json({ message: "Authentication failed" });
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcryptjs.compare(password, user.password)

  if (!passwordMatch) {
    return res.status(401)
    // .json({ message: "Authentication failed" })
    throw new Error("Invalid email or password");
  }

  if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    
  } else {
    res.status(401)
    // .json({ message: "Invalid email or password" });
    throw new Error("Invalid email or password");
  }
};

