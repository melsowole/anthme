// The MainNav class creates the navigation with the page links and dropdown menus.
// 
// This class is accessed in the PageLayout module, and wherever the navigation should be 
// displayed beyond the general page layout.
//
// Which links and dropdowns should be displayed can be edited by modifying the 
// 'links' and 'categoryDropdowns' variables.
//
// -  create method (async): Returns the DOM for the page element.

import * as template from "./templates/main-nav.js";
import { replace, stringToDOM } from "../../utilities/templateUtils.js";
import Dropdown from "./DropdownElement.js";
import {filterCookieValue} from "../../utilities/cookieUtils.js";
import { LinkItem } from "../../utilities/types.js";

const links = [
    {
      name: "Home",
      icon: "home",
      link: "/", 
    },
     {
      name: "Profile",
      icon: "person",
      get link (){return "/profile/" + filterCookieValue("username", "user")}, 
    },
  ];

const categoryDropdowns = ["Programming", "Frustration", "joyful"];

export default class MainNav {  

  static async create(): Promise<HTMLElement> {
    const navTemplate = template.nav;

    const nav = stringToDOM(navTemplate);

    const linkContainer = nav.querySelector(".links ul");
    const dropdownContainer = nav.querySelector("#dropdowns");

    links.forEach((link) =>
      linkContainer.append(this.createLinkLiItem(link))
    );

    const dropdownObjArr = await Dropdown.createCategoryObjectArray(categoryDropdowns);

    dropdownObjArr.forEach((dropdownObj) => {
      dropdownContainer.append(
        document.createElement("hr"),
        Dropdown.create(dropdownObj.label, dropdownObj.id, dropdownObj.items)
      );
    });

    return nav;
  }

  private static createLinkLiItem(item: LinkItem): HTMLElement {
    let linkItemTemplate = template.linkItem;

    linkItemTemplate = replace(linkItemTemplate, [
      { pattern: "link", replacement: item.link },
      { pattern: "icon", replacement: item.icon },
      { pattern: "name", replacement: item.name },
    ]);

    const linkItemEl = stringToDOM(linkItemTemplate);

    if(window.location.pathname == item.link){
      linkItemEl.querySelector("a").classList.add("current");

    }

    return linkItemEl
  }

}

