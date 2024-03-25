import Header from "./Header.ts";
import MainNav from "./MainNav.ts";
import MainFeed from "./MainFeed.ts";

function displayHomePage(posts: []): void {
  document.body.append(
    Header.create(),
    MainNav.create(),
    MainFeed.create(posts)
  );
}

export { displayHomePage };
