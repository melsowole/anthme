import { Error, User, Post, Comment, Category } from "./utilities/pathTypes";

const baseUrl: string = 'http://localhost:3000/';
const header = {"Content-type": "application/json; charset=UTF-8"};

async function getCategories(): Promise<Category[]> {
    const url = `${baseUrl}categories`;

    const res = await fetch(url);
    const categories = await res.json();
    
    return categories;
}

async function getFilteredCategories(categoryName: string): Promise<Category[]> {
  const url = `${baseUrl}categories/category/${categoryName}`;

  const res = await fetch(url);
  const filteredCategories = await res.json();
  return filteredCategories;
}

async function getAllUsers():Promise<User[]>{
    const url = baseUrl + 'users/';

    const res = await fetch(url);
    const users = await res.json();
    return users;
}

async function getUserByUsername(username: string): Promise<User> {
    const url = `${baseUrl}users/username/${username}`;
  console.log(url)
    const res = await fetch(url);
    const user = await res.json();
    console.log(user)
    return user;
}

async function getPosts(): Promise<Post[]> {
  const url = `${baseUrl}posts`;
  
  const res = await fetch(url);
  const posts = await res.json();

  return posts;
}

async function getPost(id: string): Promise<Post> {
  const url = baseUrl + `posts/${id}`;

  const res = await fetch(url);
  const post = await res.json();
  return post;
}

async function getPostByUser(userId:string): Promise<Post[]>{
  const url = `${baseUrl}users/${userId}/posts`

  const res = await fetch(url);
  const post = await res.json();
  return post;
}

async function getComments(): Promise<Comment[]> {
  const url = baseUrl + "comments";
  const res = await fetch(url);
  const comments = await res.json();
  return comments;
}

async function getComment(commentId:string): Promise<Comment>{
  const url = `${baseUrl}comments/${commentId}`

  const res = await fetch(url);
  const comment = await res.json();
  return comment;
}
async function getCommentsByUser(userId:string): Promise<Comment[]>{
  const url = `${baseUrl}users/${userId}/comments`

  const res = await fetch(url);
  const comment = await res.json();

  return comment;
}

async function submitPost<T extends User | Post | Comment | Error>(
  createdObject: Object,
  typeOfPost: string,
  userId?: string,
  postId?: string,
 
): Promise<any> {
  let url: string = baseUrl;
  if (typeOfPost === "user") url += `users`;
  else if (typeOfPost === "post") url += `users/${userId}/posts`;
  else if (typeOfPost === "comment")
    url += `posts/${postId}/users/${userId}/comments`;

  const options = {
    method: "POST",
    body: JSON.stringify(createdObject),
    headers: header,
  };

  const res = await fetch(url, options);
  const info = await res.json();
  return info;
}

async function sendLogInRequest(
  username: string,
  password: string
): Promise<User | Error> {
  const url = `${baseUrl}user/login`;

  const user = {
    username: username,
    password: password,
  };

  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify(user),
    headers: header,
    mode: "cors",
    credentials: "include",
  };

  const res = await fetch(url, options);
  const info = await res.json();

  return info;
}

async function readCookie(): Promise<boolean> {
  const req = new Request(`${baseUrl}read-cookie`, {
    mode: "cors",
    credentials: "include",
  });

  const res = await fetch(req);
  const cookieInfo = await res.json();
  return cookieInfo.ok;
}

async function deleteAccount(userId: string): Promise<any> {
  const url = `${baseUrl}users/${userId}`;

  const options = {
    method: "DELETE",
    headers: header,
  };

  const res = await fetch(url, options);
  const info = await res.json();

  return info;
}

async function deletePost(userId: string, postId:string):Promise<Post>{
  const url = `${baseUrl}users/${userId}/posts/${postId}`; 

  const options = {
    method: "DELETE",
    headers: header,
  };

  const res = await fetch(url, options);
  const info = await res.json();

  return info;

}

async function deleteComment(postId:string, userId:string, commentId:string):Promise<Comment>{
  const url = `${baseUrl}posts/${postId}/users/${userId}/comments/${commentId}` 

  const options = {
    method: "DELETE",
    headers: header,
  };

  const res = await fetch(url, options);
  const info = await res.json();

  return info;
}

export {
  submitPost,
  getAllUsers,
  readCookie,
  sendLogInRequest,
  getPost,
  getComments,
  getComment,
  deleteAccount,
  deletePost,
  deleteComment,
  getUserByUsername,
  getPostByUser,
  getCommentsByUser,
  getCategories,
  getPosts,
  getFilteredCategories
};
