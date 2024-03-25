import Navigo from "navigo";
import displayPostPage from "../pages/displayPostPage.ts";
import { displayLandingPage } from "../pages/displayLandingPage.ts";
import displayHomePage from "./HomePage.js";

const router = new Navigo("/");

// Register routes
router.on("/post", displayPostPage);
router.on("/", displayLandingPage);
router.on("/hello", () => {
  fetch("http://localhost:3000/posts")
    .then((r) => r.json())
    .then((posts) => {
      displayHomePage(posts);
    });
});

export { router };
