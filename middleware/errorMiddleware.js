const errorHandler = (err, req, res, next) => {
  let statusCode = err.status;
  let message = err.message || "Backend Error";

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { errorHandler };
