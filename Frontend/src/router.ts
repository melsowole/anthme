import Navigo from "navigo";
import displayPostPage from "./modules/pages/displayCreatePostPage.ts";
import { displayLandingPage } from "./modules/pages/displayLandingPage.ts";
import displayHomePage from "./modules/pages/displayHomePage.ts";
import { displayUsersPage } from "./modules/pages/components/UsersPage.ts";
import { readCookie } from "./modules/api.ts";
import { displayProfile } from "./modules/pages/displayProfilePage.ts";
import { displayViewPostPage } from "./modules/pages/displayPostPage.ts";

const router = new Navigo("/");

// Funktionen returnerar ett promise för att vänta tills readCookie() är klar
// innan router.resolve() körs från main.ts
function setupRouter(): Promise<void> {
  return new Promise((resolve, reject) => {
    readCookie()
      .then((response) => {
        if (!response) {
          router.on("*", displayLandingPage);
        } else {
          router.on("/", () => {
            fetch("http://localhost:3000/posts/")
              .then((res) => res.json())
              .then(displayHomePage);
          });
          router.on("/create-post", displayPostPage);
          router.on("/users", () => {
            fetch("http://localhost:3000/users/")
              .then((res) => res.json())
              .then(displayUsersPage);
          });
          router.on("/profile/:username", displayProfile);
          router.on("/posts/:postId", displayViewPostPage);
        }
        resolve();
      })
      .catch(reject);
  });
}

export { router, setupRouter };
