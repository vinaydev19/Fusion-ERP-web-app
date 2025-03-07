const ErrorHandler = (err, req, res, next) => {
  console.log("error handler");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    // stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export default ErrorHandler;
