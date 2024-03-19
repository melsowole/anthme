// routes all endpoints: /users, /posts, /comments
// exports {usersRouter, postsRouter, usersRouter}

import { Router } from "express";

import * as users from "./usersReqHandlers.js";
import * as posts from "./postsReqHandlers.js";

export const usersRouter = Router();

usersRouter.route("/").get(users.getAllUsers).post(users.createUser);

usersRouter.route("/:id").get(users.getOneUser).delete(users.deleteUser);

usersRouter.route("/:id/create-post").post(posts.createPost);
usersRouter.route("/:id/delete-post").delete(posts.deletePost);

export const postsRouter = Router();

postsRouter.route("/").get(posts.getAllPosts);
postsRouter.route("/:id").get(posts.getOnePost);

// export const commentsRouter = Router();
