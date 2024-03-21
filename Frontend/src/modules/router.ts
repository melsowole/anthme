import Navigo from "navigo";
import displayPostPage from "../pages/displayPostPage";

const router = new Navigo('/');

// Register routes
router.on('/post', displayPostPage)

export {router}