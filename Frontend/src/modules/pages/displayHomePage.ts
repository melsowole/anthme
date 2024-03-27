import Header from "./components/Header.ts";
import MainNav from "./components/MainNav.ts";
import MainFeed from "./components/MainFeed.ts";
import * as api from "../api.ts"
import { Category, MainCategory } from "../utilities/pathTypes.ts";

async function displayHomePage() {

  const posts = await api.getPosts();
  const programmingCategories = await api.getFilteredCategories('Programming');
  const frustratingCategories = await api.getFilteredCategories('Frustration');
  const feelGoodCategories = await api.getFilteredCategories('joyful');
  const allCategories = await api.getCategories();
  
  let dropdowns: Object[] = [];
  dropdowns.push(
    createDropdown(feelGoodCategories[0].category, feelGoodCategories),
    createDropdown(frustratingCategories[0].category, frustratingCategories),
    createDropdown(programmingCategories[0].category, programmingCategories),
    createDropdown('All', allCategories),
  )

  document.body.append(
    Header.create(),
    MainNav.create(dropdowns),
    MainFeed.create(posts)
  );
}

function createDropdown(label:string, categories: Category[]): MainCategory {
  const mainCategory: MainCategory = {
    label: label,
    id: 'dropdown-community',
    items: []
  }

  categories.forEach(category => {
    console.log(category);
    
    mainCategory.items.push({
      name: category.name,
      url: `/${category.name}`
    })
  })
  return mainCategory;
}

export { displayHomePage };
