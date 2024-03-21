// declares all request handlers to the /comments endpoint
// next(CustomError) called in catch block to throw errors in afterware
// exports {getAllComments, getOneComment, createPost, deletePost}

import CustomError from "../CustomError.js";
import { DB, User, Post, Comment } from "../../db/DBTypes.js";
import { read, write } from "../dataAccess.js";
import { Request, Response, NextFunction } from "express";
import {
  getItemById,
  getItemsById,
  removeItemFromArray,
  addItemToArray,
} from "../utils.js";

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

export async function getAllCommentsByUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const users = await read.users();
    const comments = await read.comments();

    const user = getItemById(users, req.params.userId);

    if (!user) throw new CustomError(404, "User not found");

    const commentsByUser = getItemsById(comments, user.comments);

    res.json(commentsByUser);
  } catch (err) {
    next(err);
    return;
  }
}

export async function addComment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const posts = await read.posts();
    const users = await read.users();
    const comments = await read.comments();

    const user = getItemById(users, req.params.userId);
    const post = getItemById(posts, req.params.postId);

    if (!user) throw new CustomError(404, "User not found");
    if (!post) throw new CustomError(404, "Post not found");

    // create new comment
    const newComment: Comment = {
      id: crypto.randomUUID(),
      body: req.body.body,
      created: req.body.timestamp,
      user: req.body.user,
    };

    comments.push(newComment);

    await write.comments(comments);

    addItemToArray(post.comments, newComment.id);
    addItemToArray(user.comments, newComment.id);
    await write.users(users);
    await write.posts(posts);

    res.json({ message: "Added new comment" });
  } catch (err) {
    next(err);
    return;
  }
}

export async function deleteComment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const posts = await read.posts();
    const users = await read.users();
    const comments = await read.comments();

    const post = getItemById(posts, req.params.postId);
    const user = getItemById(users, req.params.userId);
    const comment = getItemById(comments, req.params.commentId);

    // validation
    if (!post) throw new CustomError(404, "Post not found");
    if (!user) throw new CustomError(404, "User not found");
    if (!comment) throw new CustomError(404, "Comment not found");

    removeItemFromArray(comments, comment);
    removeItemFromArray(post.comments, comment.id);
    removeItemFromArray(user.comments, comment.id);

    await write.comments(comments);
    await write.posts(posts);
    await write.users(users);

    res.json({ message: "Deleted comment" });
  } catch (err) {
    next(err);
    return;
  }
}
