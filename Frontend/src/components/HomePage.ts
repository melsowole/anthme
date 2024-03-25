import Header from "./Header.js";
import MainNav from "./MainNav.js";
import MainFeed from "./MainFeed.js";

function displayHomePage(posts: []): void {
  document.body.append(
    Header.create(),
    MainNav.create(),
    MainFeed.create(posts)
  );
}

export { displayHomePage };
