// routes all endpoints
// exports {apiRouter}

import { Router } from "express";

import * as users from "./requestHandlers/usersReqHandlers.js";
import * as posts from "./requestHandlers/postsReqHandlers.js";
import * as comments from "./requestHandlers/commentsReqHandlers.js";
import * as categories from "./requestHandlers/categoriesReqHandlers.js";
import {
  validate,
  userValidations,
  postValidations,
  commentValidations,
} from "./middleware/validator.js";
import { addUserInfo } from "./middleware/addUserInfo.js";
import { readCookie, setCookie } from "./requestHandlers/cookiesReqHandlers.js";

const apiRouter = Router();

// Users Endpoints
apiRouter
  .route("/users")
  .get(users.getAllUsers)
  .post(validate(userValidations), users.createUser);

apiRouter
  .route("/users/:userId")
  .get(users.getUserById)
  .delete(users.deleteUser);

apiRouter.route("/users/username/:username").get(users.getUserByUsername);

apiRouter
  .route("/users/:userId/posts")
  .get(posts.getAllPostsbyUser)
  .post(addUserInfo, validate(postValidations), posts.createPost);

apiRouter.route("/users/:userId/comments").get(comments.getAllCommentsByUser);

apiRouter.route("/users/:userId/posts/:postId").delete(posts.deletePost);

// Posts routes
apiRouter.route("/posts").get(posts.getAllPosts);

apiRouter.route("/posts/:postId").get(posts.getPostById);

// Comments routes
apiRouter.route("/comments").get(comments.getAllComments);
apiRouter.route("/comments/:commentId").get(comments.getCommentById);

apiRouter
  .route("/posts/:postId/users/:userId/comments")
  .post(addUserInfo, validate(commentValidations), comments.addComment);

apiRouter
  .route("/posts/:postId/users/:userId/comments/:commentId")
  .delete(comments.deleteComment);

// Categories

apiRouter.route("/categories").get(categories.getAll);
apiRouter.route("/categories/:categoryName").get(categories.getOneCategory);

// Cookie and login routes
apiRouter.route("/read-cookie").get(readCookie);
apiRouter.route("/user/login").post(setCookie);

export { apiRouter };
