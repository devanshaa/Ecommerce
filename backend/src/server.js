import createError from "http-errors";
import express, { json } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import usersRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import productRouter from "./routes/productRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import errorMiddleware from "./middleware/error.js";
import { createConnection } from "./config/config.js";
import cloudinary from "cloudinary";
import cors from "cors";
// import Formidable from "formidable";
import dotenv from "dotenv";
dotenv.config({path:"../../.env"});
import bodyParser from "body-parser";
import fileupload from "express-fileupload";
var app = express();

app.use(logger("dev"));
app.use(json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(
  fileupload({
    createParentPath: true,
  })
);
app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/payment", paymentRouter);
app.use(errorMiddleware);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//Creating connection with cloudinary
createConnection();

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

export default app;
