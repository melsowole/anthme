import Header from "./components/Header.ts";
import MainNav from "./components/MainNav.ts";
import MainFeed from "./components/MainFeed.ts";
import Noticeboard from "./components/Noticeboard.ts";
import UserProfile from "./components/UserProfile.ts";

async function displayHomePage(posts: []): Promise<void> {
  const r = await fetch("http://localhost:3000/users");
  const users = await r.json();

  const userArr = users.map((u) =>
    UserProfile.createPreview(u.username, u.userImage)
  );

  document.body.append(
    Header.create(),
    MainNav.create(),
    MainFeed.create(posts),
    Noticeboard.createDOM("Users", userArr)
  );
}

export default displayHomePage;
