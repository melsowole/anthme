// exports all types associated with database

export type DBPath = "users" | "comments" | "posts" | "categories";

export type User = {
  id: string;
  created: number;
  username: string;
  password: string;
  userImage: string;
  posts: string[];
  comments: string[];
};

export type UserShort = {
  id: string;
  username: string;
  userImage: string;
};

export type Post = {
  id: string;
  created: number;
  category: string;
  title: string;
  body: string;
  comments: string[];
  user: UserShort;
};

export type Comment = {
  id: string;
  created: number;
  body: string;
  user: UserShort;
};

export type Category = string;

export type DB<T extends User | Post | Comment | Category> = T[];
