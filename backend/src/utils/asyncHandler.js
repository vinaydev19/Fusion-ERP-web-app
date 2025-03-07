import { ApiError } from "./ApiError.js";

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      if (!error.statusCode) {
         error = new ApiError(500, "Internal Server Error");
      }
      next(error);
    });
  };
};

export { asyncHandler };

