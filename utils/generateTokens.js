import jwt from 'jsonwebtoken';

const generateToken = (req, res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  
    // res.cookie('jwt', token, {
    //   httpOnly: false,
    //   secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    //   sameSite: 'strict', // Prevent CSRF attacks
    //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    // });
    return token;
  } catch (error) {
    const err = new Error(error);
    err.status = 401;
    console.log(err)
  }
  // return token;
};

export default generateToken;