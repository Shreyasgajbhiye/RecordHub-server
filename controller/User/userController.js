

import Student from '../../model/User/User.js'

export const signup = (async (req, res) => {
  const { name, email, password, year } = req.body;

  const userExists = await Student.findOne({ email });

  if (userExists) {
    res.status(400).json({message: "User already exists"});
  }

  // const user = await Student.create({
  //   name,
  //   email,
  //   password,
  //   year
  // });

const user = Student.register(name, email, password, year,
    (err, student) => {
      if (err) {
        console.log(err)
      } else {
        passport.authenticate("local")
          (req, res, function () {
            res.send("successfully saved!");
          })
      }
    })



  if (user) {
    // generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});