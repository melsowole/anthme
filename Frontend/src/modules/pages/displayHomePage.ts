import Header from "./components/Header.ts";
import MainNav from "./components/MainNav.ts";
import MainFeed from "./components/MainFeed.ts";
import * as api from "../api.ts";
import { generateDropdowns } from "../utilities/dropdownUtils.ts";
import UserNoticeboard from "./components/UserNoticeboard.ts";
import { Category } from "../utilities/pathTypes.ts";
import Sidebar from "./components/Sidebar.ts"


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
    Sidebar.create([
      await UserNoticeboard.create()
    ])
  );
}

async function getPageCategory():Promise<Category|false>{
  const categoryName = getPageURLParam();

  if(!categoryName) return false;

  return await api.getCategory(categoryName)
}

function getPageURLParam() :string{
  const urlParts: string[] = window.location.pathname.split("/");
  const urlPathEndpoint: string = urlParts[urlParts.length - 1];
  return urlPathEndpoint
}