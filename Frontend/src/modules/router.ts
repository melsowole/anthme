import Navigo from "navigo";
import displayPostPage from "../pages/displayPostPage.ts";
import { displayLandingPage } from "../pages/displayLandingPage.ts";


const router = new Navigo('/');

// Register routes
router.on('/post', displayPostPage)
router.on('/', displayLandingPage)

export {router}