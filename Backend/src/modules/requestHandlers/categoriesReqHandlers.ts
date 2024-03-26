// declares all request handlers to the /comments endpoint
// next(CustomError) called in catch block to throw errors in afterware
// exports {getAllComments, getOneComment, createPost, deletePost}

import CustomError from "../CustomError.js";
import { DB, Category } from "../../db/DBTypes.js";
import { read, write } from "../dataAccess.js";
import { Request, Response, NextFunction } from "express";

export async function getAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  console.log("hello");
  const categories: DB<Category> = await read.categories();

  res.json(categories);
}
