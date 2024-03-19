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

    const post = posts.find((p) => p.id == +req.params.id);

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

    const user = getItemById(users, +req.params.id);

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

    // validation
    const reqKeyMissing =
      !req.body.category || !req.body.title || !("content" in req.body);
    if (reqKeyMissing) throw new CustomError(400, "Request body keys missing");

    const user = getItemById(users, +req.params.id);

    if (!user) throw new CustomError(404, "User not found");

    // create new post
    const newPost: Post = {
      id: Date.now(),
      category: req.body.category,
      title: req.body.title,
      content: req.body.content,
      comments: [],
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

    const post = getItemById(posts, +req.params.postId);
    const user = getItemById(users, +req.params.id);

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
