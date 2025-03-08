import { ApiError } from "./ApiError.js";

const asyncHandler = (fn) => async (...args) => {
  try {
    await fn(...args);
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error = new ApiError(500, "Internal Server Error");
    }
    const next = args[2]; // Extract next from args
    if (typeof next === "function") {
      next(error);
    }
  }
};

export { asyncHandler };
