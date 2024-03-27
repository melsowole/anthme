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

export async function getOneCategory(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const categories: DB<Category> = await read.categories();
  
  const category = categories.find(c => c.name == req.params.categoryName)
  
  if(category) res.json(category);
  else throw new CustomError(404, 'Category not found')
}
