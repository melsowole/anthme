import Header from "./components/Header.ts";
import MainNav from "./components/MainNav.ts";
import MainFeed from "./components/MainFeed.ts";
import * as api from "../api.ts"
import { generateDropdowns } from "../utilities/dropdownUtils.ts";

async function displayHomePage() {

  const posts = await api.getPosts();
  const dropdowns = await generateDropdowns();

  document.body.append(
    Header.create(),
    MainNav.create(dropdowns),
    MainFeed.create(posts)
  );
}

export { displayHomePage };
