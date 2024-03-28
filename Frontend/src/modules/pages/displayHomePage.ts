import Header from "./components/Header.ts";
import MainNav from "./components/MainNav.ts";
import MainFeed from "./components/MainFeed.ts";
import * as api from "../api.ts";
import { generateDropdowns } from "../utilities/dropdownUtils.ts";
import UserProfile from "./components/UserProfile.ts";
import Noticeboard from "./components/Noticeboard.ts";
import { User } from "../utilities/pathTypes.ts";

async function displayHomePage() {
  const posts = await api.getPosts();
  const dropdowns = await generateDropdowns();

  document.body.append(
    Header.create(),
    MainNav.create(dropdowns),
    MainFeed.create(posts),
    Noticeboard.create("Users", await usersNoticeBoard())
  );
}

export default displayHomePage;

async function usersNoticeBoard(): Promise<HTMLElement[]> {
  const r = await fetch("http://localhost:3000/users");
  const users = await r.json();

  const userArr = users.map((u: User) =>
    UserProfile.createPreview(u.username, u.userImage)
  );

  const seeMore = document.createElement("a");
  seeMore.textContent = "See More";
  seeMore.href = "/users";

  userArr.push(seeMore);

  return userArr;
}
