import Header from "./components/Header.ts";
import MainNav from "./components/MainNav.ts";
import MainFeed from "./components/MainFeed.ts";
import * as api from "../api.ts";
import { generateDropdowns } from "../utilities/dropdownUtils.ts";
import UserProfile from "./components/UserProfile.ts";
import Noticeboard from "./components/Noticeboard.ts";
import { User, Category } from "../utilities/pathTypes.ts";


export default async function displayHomePage() {
  let posts = await api.getPosts();
  const dropdowns = await generateDropdowns();
  
  const category : false | Category = await getPageCategory()

  if(category){
    posts = posts.filter(p=>p.category == category.name);
  }

  document.body.append(
    Header.create(),
    MainNav.create(dropdowns),
    MainFeed.create(posts),
    Noticeboard.create("Users", await usersNoticeBoard(), 5)
  );
}

async function getPageCategory():Promise<Category|false>{
  const categoryName = getPageURLParam();

  console.log(categoryName)

  if(!categoryName) return false;

  return await api.getCategory(categoryName)
}

function getPageURLParam() :string{
  const urlParts: string[] = window.location.pathname.split("/");
  const urlPathEndpoint: string = urlParts[urlParts.length - 1];
  return urlPathEndpoint
}

async function usersNoticeBoard(): Promise<any[]> {
  const users = await api.getAllUsers();

  if(users.length == 0 ) return ["No users..."];

  const userArr = users.map((u: User) =>
    UserProfile.createPreview(u.username, u.userImage)
  );

  const seeMore = document.createElement("a");
  seeMore.textContent = "See More";
  seeMore.href = "/users";

  userArr.push(seeMore);

  return userArr;
}
