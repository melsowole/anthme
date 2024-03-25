import Header from "./Header";
import MainNav from "./MainNav";
import MainFeed from "./MainFeed";

export default function displayHomePage(posts: []) {
  document.body.append(
    Header.create(),
    MainNav.create(),
    MainFeed.create(posts)
  );
}
