import Header from "./Header";
import MainNav from "./MainNav";
import MainFeed from "./MainFeed";

function displayHomePage(posts: []) {
  document.body.append(
    Header.create(),
    MainNav.create(),
    MainFeed.create(posts)
  );
}

export { displayHomePage };
