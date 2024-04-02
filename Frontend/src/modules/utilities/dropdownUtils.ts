import {Category, NavMainCategory} from "./types.ts"
import * as api from "../api.js"

async function generateDropdowns(): Promise<NavMainCategory[]> {
    const programmingCategories = await api.getAllFilteredCategories('Programming');
    const frustratingCategories = await api.getAllFilteredCategories('Frustration');
    const feelGoodCategories = await api.getAllFilteredCategories('joyful');
    const allCategories = await api.getAllCategories();
    
    let dropdowns: NavMainCategory[] = [];
    dropdowns.push(
        createDropdown(feelGoodCategories[0].category, feelGoodCategories),
        createDropdown(frustratingCategories[0].category, frustratingCategories),
        createDropdown(programmingCategories[0].category, programmingCategories),
        createDropdown('All', allCategories),
    )
    return dropdowns;
}

function createDropdown(label:string, categories: Category[]): NavMainCategory {
    const mainCategory: NavMainCategory = {
      label: label,
      id: `dropdown-${label}`,
      items: []
    }
  
    categories.forEach(category => {
      mainCategory.items.push({
        name: category.name,
        url: `/${category.name}`
      })
    })
    return mainCategory;
}

export {generateDropdowns}