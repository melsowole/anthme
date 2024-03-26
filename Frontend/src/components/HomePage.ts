import Header from "./Header.ts";
import MainNav from "./MainNav.ts";
import MainFeed from "./MainFeed.ts";
import PostNoticeboard from "./PostNoticeboard.ts";

function displayHomePage(posts: []): void {
  const noticeboardContent: string[] = [
    ''
  ]

  document.body.append(
    Header.create(),
    MainNav.create(),
    MainFeed.create(posts),
    PostNoticeboard.createDOM('Users', noticeboardContent)
  );
}

export { displayHomePage };
