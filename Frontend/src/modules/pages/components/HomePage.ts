import Header from "./Header.ts";
import MainNav from "./MainNav.ts";
import MainFeed from "./MainFeed.ts";
import PostNoticeboard from "./PostNoticeboard.ts";

function displayHomePage(posts: []): void {
  document.body.append(
    Header.create(),
    MainNav.create(),
    MainFeed.create(posts),
    PostNoticeboard.createDOM("Users", "a", [{ text: "meg", link: "carlos" }])
  );
}

export { displayHomePage };
