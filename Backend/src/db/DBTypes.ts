// exports all types associated with database

export type DBPath = "users" | "comments" | "posts";

export type User = {
  id: number;
  username: string;
  password: number;
  posts: number[];
  comments: number[];
};

export type Post = {
  id: number;
  category: string;
  title: string;
  content: string;
  comments: number[];
};

export type Comment = {
  id: number;
  content: string;
};

export type DB<T extends User | Post | Comment> = T[];
