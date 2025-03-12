import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ limit: "20kb", extended: true }));
app.use(express.json());
app.use(express.static("public"));

// import router
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/products.routes.js";

// router use
app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export { app };
