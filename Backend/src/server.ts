// Declares all middleware, routes and afterware
// exports {app}

import express from "express";
import cors from "cors";
import CustomError from "./modules/CustomError.js";
import { usersRouter, postsRouter } from "./modules/routes.js";
// import { usersRouter, postsRouter, commentsRouter } from "./modules/routes.js";

export const app = express();

//Middleware
app.use(express.json(), cors());

//Routes
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
// app.use("/comments", commentsRouter);

// Afterware, handles errors thrown in req handlers
app.use((err: CustomError, req, res, next) => {
  res
    .status(err.statusCode)
    .json({ statusCode: err.statusCode, message: err.message });
  return;
});
