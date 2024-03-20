// exports all types associated with database

export type DBPath = "users" | "comments" | "posts";

export type User = {
  id: string;
  username: string;
  password: number;
  userImage: string;
  posts: string[];
  comments: string[];
};

export type Post = {
  id: string;
  category: string;
  title: string;
  body: string;
  userImage: string;
  comments: string[];
};

export type Comment = {
  id: string;
  body: string;
};

export type DB<T extends User | Post | Comment> = T[];
