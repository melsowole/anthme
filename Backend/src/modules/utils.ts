import { DB, User, Post, Comment } from "../db/DBTypes.js";

export function getItemById<T extends User | Post | Comment>(
  array: T[],
  id: number
): T {
  const item = array.find((t) => t.id == id);

  return item;
}

export function removeItemFromArray<T>(array: T[], item: T) {
  const index = array.indexOf(item);

  if (index !== -1) {
    array.splice(index, 1);
  }

  return array;
}

export function addItemToArray<T>(array: T[], item: T) {
  return array.push(item);
}
