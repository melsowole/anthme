// declares all request handlers mainly modifying posts.json
// next(CustomError) called in catch block to throw errors in afterware
// exports {getAllPosts, getOnePost, getAllPostsByUser, createPost, deletePost}

import CustomError from "../CustomError.js";
import { DB, User, Post, Comment } from "../../db/DBTypes.js";
import { read, write } from "../dataAccess.js";
import { Request, Response, NextFunction } from "express";
import {
  getItemById,
  removeItemFromArray,
  addItemToArray,
  getItemsById,
} from "../utils.js";

export async function getAllPosts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const posts: DB<Post> = await read.posts();

  res.json(posts);
}

export async function getOnePost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const posts: DB<Post> = await read.posts();

    const post = posts.find((p) => p.id === req.params.postId);

    //validation
    if (!post) throw new CustomError(404, "Post not found");

     res.json(post);
  } catch (err) {
    next(err);
    return;
  }
}

export async function getAllPostsbyUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const posts = await read.posts();
    const users = await read.users();

    const user = getItemById(users, req.params.userId);

    if (!user) throw new CustomError(404, "User not found");

    const postsByUser = getItemsById(posts, user.posts);

    res.json(postsByUser);
  } catch (err) {
    next(err);
    return;
  }
}

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const posts = await read.posts();
    const users = await read.users();

    const user = getItemById(users, req.params.userId);

    if (!user) throw new CustomError(404, "User not found");

    // create new post
    const newPost: Post = {
      id: crypto.randomUUID(),
      created: req.body.timestamp,
      category: req.body.category,
      title: req.body.title,
      body: req.body.body,
      comments: [],
      user: req.body.user,
    };

    posts.push(newPost);
    await write.posts(posts);

    addItemToArray(user.posts, newPost.id);
    await write.users(users);

    res.json({ message: "Added new post" });
  } catch (err) {
    next(err);
    return;
  }
}

export async function deletePost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const posts = await read.posts();
    const users = await read.users();

    const post = getItemById(posts, req.params.postId);
    const user = getItemById(users, req.params.userId);

    if (!post) throw new CustomError(404, "Post not found");

    removeItemFromArray(posts, post);

    removeItemFromArray(user.posts, post.id);

    await write.posts(posts);
    await write.users(users);

    //   TODO: REMOVE Comments

    res.json({ message: "Deleted post" });
  } catch (err) {
    next(err);
    return;
  }
}
