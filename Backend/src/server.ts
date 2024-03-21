// Declares all middleware, routes and afterware
// exports {app}

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import CustomError from "./modules/CustomError.js";
import { apiRouter } from "./modules/apiRouter.js";
import { addTimestamp } from "./modules/middleware/addTimestamp.js";

const app = express();

//Middleware
app.use(express.json(), cors());
app.use(addTimestamp);

//Routes
app.use("/", apiRouter);

// Afterware, handles errors thrown in req handlers
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.statusCode)
    .json({ statusCode: err.statusCode, message: err.message });
  return;
});

export { app };
