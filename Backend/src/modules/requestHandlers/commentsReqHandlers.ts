// declares all request handlers to the /comments endpoint
// next(CustomError) called in catch block to throw errors in afterware
// exports {getAllComments, getOneComment, createPost, deletePost}

import CustomError from "../CustomError.js";
import { DB, User, Post, Comment } from "../../db/DBTypes.js";
import { read, write } from "../dataAccess.js";
import { Request, Response, NextFunction } from "express";
import { getItemById, removeItemFromArray, addItemToArray } from "../utils.js";

export async function getAllComments(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const comments: DB<Comment> = await read.comments();

  res.json(comments);
}

export async function getOneComment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const comments: DB<Comment> = await read.comments();

    const comment = res.json(comments);
  } catch (err) {
    next(err);
    return;
  }
}
