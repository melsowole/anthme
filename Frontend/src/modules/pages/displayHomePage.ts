import Header from "./components/Header.ts";
import MainNav from "./components/MainNav.ts";
import MainFeed from "./components/MainFeed.ts";

function displayHomePage(posts: []) {
  document.body.append(
    Header.create(),
    MainNav.create(),
    MainFeed.create(posts)
  );
}

export { displayHomePage };
