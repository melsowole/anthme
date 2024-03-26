import Header from "../templates/components/Header";
import MainNav from "../templates/components/MainNav";
import MainFeed from "../templates/components/MainFeed";

function displayFeedPage(posts: []) {
  document.body.append(
    Header.create(),
    MainNav.create(),
    MainFeed.create(posts)
  );
}

export { displayFeedPage };
