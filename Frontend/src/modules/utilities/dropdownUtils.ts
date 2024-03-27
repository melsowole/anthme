import { Category, MainCategory } from "../utilities/pathTypes.ts";
import * as api from "../api.ts"

async function generateDropdowns(): Promise<MainCategory[]> {
    const programmingCategories = await api.getFilteredCategories('Programming');
    const frustratingCategories = await api.getFilteredCategories('Frustration');
    const feelGoodCategories = await api.getFilteredCategories('joyful');
    const allCategories = await api.getCategories();
    
    let dropdowns: MainCategory[] = [];
    dropdowns.push(
        createDropdown(feelGoodCategories[0].category, feelGoodCategories),
        createDropdown(frustratingCategories[0].category, frustratingCategories),
        createDropdown(programmingCategories[0].category, programmingCategories),
        createDropdown('All', allCategories),
    )
    return dropdowns;
}

function createDropdown(label:string, categories: Category[]): MainCategory {
    const mainCategory: MainCategory = {
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