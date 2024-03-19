// Declares all middleware, routes and afterware
// exports {app}

import express from "express";
import cors from "cors";
import CustomError from "./modules/CustomError.js";
import { apiRouter } from "./modules/apiRouter.js";

const app = express();

//Middleware
app.use(express.json(), cors());

//Routes
app.use("/", apiRouter);

// Afterware, handles errors thrown in req handlers
app.use((err: CustomError, req, res, next) => {
  res
    .status(err.statusCode)
    .json({ statusCode: err.statusCode, message: err.message });
  return;
});

export { app };
