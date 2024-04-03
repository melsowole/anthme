import {getContrastColor} from "../../utilities/textColorUtils.js"
import { Category } from "../../utilities/types.js";
import {replace, stringToDOM} from "../../utilities/templateUtils.js";
import * as template from "./templates/category-profile.js";


export default class CategoryProfile{

  static create(category: Category, tagName: string):HTMLElement{
    const headerTemplate = this.createProfileTemplate(category, tagName);

    return stringToDOM(headerTemplate);
  }

  static string(category: Category, tagName: string) {
    return this.createProfileTemplate(category, tagName);
  }

  private static createProfileTemplate(category: Category, tagName: string){
    console.log(category.color, getContrastColor(category.color))
    const headerTemplate = replace(template.profile, [
      {pattern: "tag-name", replacement: tagName},
      {pattern: "category-name", replacement: category.name},
      {pattern: "category-bg-color", replacement: category.color},
      {pattern: "category-text-color", replacement: getContrastColor(category.color)},
      {pattern: "category-icon", replacement: category.icon}, 
    ]);

    return headerTemplate;
  }
}

