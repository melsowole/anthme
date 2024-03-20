// routes all endpoints: /users, /posts, /comments
// exports {usersRouter, postsRouter, usersRouter}

import { Router } from "express";

import * as users from "./requestHandlers/usersReqHandlers.js";
import * as posts from "./requestHandlers/postsReqHandlers.js";
import * as comments from "./requestHandlers/commentsReqHandlers.js";
import { validate, userValidations, postValidations, commentValidations } from "./validator.js";

const apiRouter = Router();

// Users Endpoints
apiRouter.route("/users").get(users.getAllUsers).post(validate(userValidations), users.createUser);

apiRouter.route("/user/:id").get(users.getOneUser).delete(users.deleteUser);

apiRouter
  .route("/user/:id/posts")
  .get(posts.getAllPostsbyUser)
  .post(validate(postValidations), posts.createPost);

apiRouter.route("/user/:id/posts/delete/:postId").delete(posts.deletePost);

// Posts routes
apiRouter.route("/posts").get(posts.getAllPosts);

apiRouter.route("/posts/:id").get(posts.getOnePost);

// Comments routes
apiRouter.route("/comments").get(comments.getAllComments);

apiRouter.route("/posts/:id/user/:userId/comment").post(comments.addComment);

apiRouter
  .route("/posts/:id/user/:userId/comment/delete/:commentId")
  .delete(comments.deleteComment);

export { apiRouter };
