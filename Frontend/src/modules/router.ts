import Navigo from "navigo";
import { displayPostPage } from "./displayGUI.ts";

const router = new Navigo('/');

// Register routes
router.on('/post', displayPostPage)

export {router}