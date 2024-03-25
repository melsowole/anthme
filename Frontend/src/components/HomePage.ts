import Header from "./Header.ts";
import MainNav from "./MainNav.ts";
import MainFeed from "./MainFeed.ts";
import Noticeboard from "./Noticeboard.ts";

function displayHomePage(posts: []): void {
  const noticeboardContent: string[] = [
    ''
  ]

  document.body.append(
    Header.create(),
    MainNav.create(),
    MainFeed.create(posts),
    Noticeboard.createDOM('Users', noticeboardContent)
  );
}

export { displayHomePage };
