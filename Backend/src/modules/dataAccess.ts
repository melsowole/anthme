// handles all reading and writing to database
// exports {read, write} with methods: users, posts and comments

import fs from "fs/promises";
import { DB, DBPath, User, Post, Comment } from "../db/DBTypes.js";

const getDBPath = (path: string) => `./src/db/${path}.json`;

export const read = {
  users: async (): Promise<DB<User>> => await readFromDB("users"),
  posts: async (): Promise<DB<Post>> => await readFromDB("posts"),
  comments: async (): Promise<DB<Comment>> => await readFromDB("comments"),
};

export const write = {
  users: async (data: DB<User>): Promise<void> =>
    await writeToDB("users", data),
  posts: async (data: DB<Post>): Promise<void> =>
    await writeToDB("posts", data),
  comments: async (data: DB<Comment>): Promise<void> =>
    await writeToDB("comments", data),
};

async function readFromDB<T extends User | Post | Comment>(
  path: DBPath
): Promise<DB<T>> {
  const db = await fs.readFile(getDBPath(path), "utf-8");

  const dbObj: DB<T> = db == "" ? [] : JSON.parse(db);

  return dbObj;
}

async function writeToDB(
  path: DBPath,
  data: DB<User | Post | Comment>
): Promise<void> {
  fs.writeFile(getDBPath(path), JSON.stringify(data, null, 2));
}
