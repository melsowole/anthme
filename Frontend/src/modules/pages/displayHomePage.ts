import Header from "./components/Header.ts";
import MainNav from "./components/MainNav.ts";
import MainFeed from "./components/MainFeed.ts";
import Noticeboard from "./components/Noticeboard.ts";

function displayHomePage(posts: []): void {
  document.body.append(
    Header.create(),
    MainNav.create(),
    MainFeed.create(posts),
    Noticeboard.createDOM("Users", [{ text: "meg", link: "carlos" }])
  );
}

export default displayHomePage;
