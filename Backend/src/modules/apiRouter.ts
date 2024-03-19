// routes all endpoints: /users, /posts, /comments
// exports {usersRouter, postsRouter, usersRouter}

import { Router } from "express";

import * as users from "./requestHandlers/usersReqHandlers.js";
import * as posts from "./requestHandlers/postsReqHandlers.js";
import * as comments from "./requestHandlers/commentsReqHandlers.js";

const apiRouter = Router();

// Users Endpoints
apiRouter.route("/users").get(users.getAllUsers).post(users.createUser);

apiRouter.route("/user/:id").get(users.getOneUser).delete(users.deleteUser);

apiRouter
  .route("/user/:id/posts")
  .get(posts.getAllPostsbyUser)
  .post(posts.createPost);

apiRouter.route("/user/:id/posts/delete/:postId").delete(posts.deletePost);

// Posts routes
apiRouter.route("/posts").get(posts.getAllPosts);

apiRouter.route("/posts/:id").get(posts.getOnePost);

// Comments routes
apiRouter.route("/comments").get(comments.getAllComments);

export { apiRouter };
