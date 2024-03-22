import Navigo from "navigo";
import displayPostPage from "../pages/displayPostPage.ts";
import { displayLandingPage } from "../pages/displayLandingPage.ts";
import { displayFeedPage } from "../pages/displayFeedPage.ts";

const router = new Navigo("/");

const url = "http://localhost:3000/posts";

// Register routes
router.on("/post", displayPostPage);
router.on("/", () => {
  fetch(url)
    .then((r) => r.json())
    .then((posts) => {
      console.log(posts);
      displayFeedPage(posts);
    });
});

export { router };
