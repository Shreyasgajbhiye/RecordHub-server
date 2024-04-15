
import Student from '../model/Student.model.js'
import generateToken from '../utils/generateTokens.js';
import bcryptjs from 'bcrypt'

export const signup = (async (req, res) => {
  const { fname, mname, lname, email, password, year } = req.body;

  const userExists = await Student.findOne({ email });

  if (userExists) {
    res.status(400)
    .json({ message: "User already exists" });
    // throw new Error("User already exists");
  }

  const hashedPassword = await bcryptjs.hash(password, 10)

  const user = await Student.create({
    fname,
    mname,
    lname,
    email,
    password: hashedPassword,
    year
  });



  if (user) {
    res.status(201).json({ message: "User registered successfully!" });
  } else {
    res.status(400)
    .json({ error: "Registration failed" });
    // throw new Error("Registration failed");
  }
});



export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Student.findOne({ email });

  if (!user) {
    return res.status(401)
    .json({ message: "Authentication failed" });
    // throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcryptjs.compare(password, user.password)

  if (!passwordMatch) {
    return res.status(401)
    .json({ message: "Authentication failed" })
    // throw new Error("Invalid email or password");
  }

  if (user) {
    if(user.isApproved){
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
    else{
      res.status(401)
      .json({ message: "Not approved yet" });
      // const error = new Error("Student not approved");
      // next(error);
    }
  } else {
    res.status(401)
    .json({ message: "Invalid email or password" });
    // throw new Error("Invalid email or password");
  }
};

export const approveStudent = async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    await Student.updateOne({_id : req.params.id}, {
      $set: {
        isApproved: true
      }
    });
    res.status(201).json({message: "Student Approved successfully!"});
  }else{
    res.status(401).json({message: "Student not found"});
  }
}

export const getAllStudents = async (req, res, next) => {
  const students = await Student.find({});
  res.status(200).json({students});
}