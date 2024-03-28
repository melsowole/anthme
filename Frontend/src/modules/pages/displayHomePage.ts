import Header from "./components/Header.ts";
import MainNav from "./components/MainNav.ts";
import MainFeed from "./components/MainFeed.ts";
import * as api from "../api.ts";
import { generateDropdowns } from "../utilities/dropdownUtils.ts";
import UserProfile from "./components/UserProfile.ts";

async function displayHomePage() {
  const posts = await api.getPosts();
  const dropdowns = await generateDropdowns();

  const r = await fetch("http://localhost:3000/users");
  const users = await r.json();

  const userArr = users.map((u) =>
    UserProfile.createPreview(u.username, u.userImage)
  );

  document.body.append(
    Header.create(),
    MainNav.create(dropdowns),
    MainFeed.create(posts),
    Noticeboard.createDOM("Users", userArr)
  );
}

export default displayHomePage;
