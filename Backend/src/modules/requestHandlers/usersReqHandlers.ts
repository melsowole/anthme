// declares all request handlers to the /users endpoint
// next(CustomError) called in catch block to throw errors in afterware
// exports {getAllUsers, getOneUser, createUser, deleteUser}

import CustomError from "../CustomError.js";
import { DB, User, Post, Comment } from "../../db/DBTypes.js";
import { read, write } from "../dataAccess.js";
import { Request, Response, NextFunction } from "express";
import { getItemById } from "../utils.js";

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const users: DB<User> = await read.users();

  res.json(users);
}

export async function getOneUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const users: DB<User> = await read.users();

    // getItemById throws error if Id not found
    const user = getItemById(users, req.params.userId);

    res.json(user);
  } catch (err) {
    next(err);
    return;
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const users: DB<User> = await read.users();

    const usernameTaken = users.find((u) => u.username == req.body.username);
    if (usernameTaken) throw new CustomError(409, "Username already taken");

    // add new user
    const newUser: User = {
      id: crypto.randomUUID(),
      username: req.body.username,
      password: req.body.password,
      userImage: req.body.userImage,
      created: req.body.timestamp,
      posts: [],
      comments: [],
    };

    users.push(newUser);
    await write.users(users);
    res.json(newUser);
  } catch (error) {
    next(error);
    return;
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const users: DB<User> = await read.users();

    const user = users.find((u) => u.id === req.params.userId);

    if (!user) throw new CustomError(404, "User not found");

    const index = users.indexOf(user);

    users.splice(index, 1);

    await write.users(users);

    // TODO: Delete all posts and comments

    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
    return;
  }
}