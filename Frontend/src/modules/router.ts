import Navigo from "navigo";
import displayPostPage from "../pages/displayPostPage.ts";
import { displayLandingPage } from "../pages/displayLandingPage.ts";
import { displayHomePage } from "../components/HomePage.ts";
import { displayUsersPage } from "../components/UsersPage.ts";
import { readCookie } from "./api.ts";

const router = new Navigo("/");

// Funktionen returnerar ett promise för att vänta tills readCookie() är klar
// innan router.resolve() körs
function setupRouter(): Promise<void> {
  return new Promise((resolve, reject) => {
    readCookie()
      .then((response) => {
        if (!response) {
          router.on("*", () => {
            fetch("http://localhost:3000/posts/")
              .then((res) => res.json())
              .then(displayHomePage);
          });
        } else {
          router.on("/", () => {
            fetch("http://localhost:3000/posts/")
              .then((res) => res.json())
              .then(displayHomePage);
          });
          router.on("/post", displayPostPage);
          router.on("/users", () => {
            fetch("http://localhost:3000/users/")
              .then((res) => res.json())
              .then(displayUsersPage);
          });
        }
        resolve();
      })
      .catch(reject);
  });
}

export { router, setupRouter };

// const router = new Navigo('/');

// // Register routes
// readCookie().then(res => {
//     if(!res) {
//         router.on('*', displayLandingPage)
//     }
//     else {
//         router.on('/', displayPostPage)
//         router.on('/homepage', () => {
//             fetch('http://localhost:3000/posts/')
//             .then(res => res.json())
//             .then(displayHomePage)
//         })
//     }
//     router.resolve()
// })

// export {router}
