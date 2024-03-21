import { displayHomePage } from "./modules/HomePage";

const url = "http://localhost:3000/posts";

fetch(url)
  .then((r) => r.json())
  .then((posts) => {
    displayHomePage(posts);
  });
