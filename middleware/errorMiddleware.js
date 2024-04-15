<<<<<<< HEAD
// const notFound = (req, res, next) => {
//     const error = new Error(`Not Found - ${req.originalUrl}`);
//     res.status(404);
//     next(error);
//   };
  
//   const errorHandler = (err, req, res, next) => {
//     let statusCode = res.statusCode ;mk
//     let message = err.message;
  
//     // If Mongoose not found error, set to 404 and change message
//     if (err.name === 'CastError' && err.kind === 'ObjectId') {
//       statusCode = 404;
//       message = 'Resource not found';
//     }
  
//     res.status(statusCode).json({
//       message: message,
//       stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//     });
//   };

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statuscode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "developement" ? err.stack : null
  })
}
  export { errorHandler };
=======
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
  
  const errorHandler = (err, req, res, next) => {
    let statusCode = res.status;
    let message = err.message;
    console.log(statusCode)
    // If Mongoose not found error, set to 404 and change message
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      statusCode = 404;
      message = 'Resource not found';
    }
  
    res.status(statusCode).json({
      message: message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  export { notFound, errorHandler };
>>>>>>> 62f15c19549aeddc6bad5085ee4d1bb130edd24c
