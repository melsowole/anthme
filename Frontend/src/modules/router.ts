import Navigo from "navigo";
import displayPostPage from "../pages/displayPostPage.ts";
import { displayLandingPage } from "../pages/displayLandingPage.ts";
import { displayHomePage } from "../templates/components/HomePage.ts";

const router = new Navigo('/');

// Register routes
router.on('/', displayLandingPage)
router.on('/post', displayPostPage)
router.on('/homepage', () => {
    fetch('http://localhost:3000/posts/')
    .then(res => res.json())
    .then(displayHomePage)
})

export {router}