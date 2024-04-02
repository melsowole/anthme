import * as template from "./templates/main-nav.js";
import { replace, stringToDOM } from "../../utilities/templateUtils.js";
import Dropdown from "./DropdownElement.js";
import { NavMainCategory } from "../../utilities/types.js";
import {filterCookieValue} from "../../utilities/cookieUtils.js";
import { readCookie } from "../../api.js";

type LinkItem = {
  link: string;
  icon: string;
  name: string;
};

const links = [
    {
      name: "Home",
      icon: "home",
      link: "/", 
    },
     {
      name: "Profile",
      icon: "person",
      get link (){return getUserProfileLink()}, 
    },
  ];

export default class MainNav {  

  static create(dropdowns: NavMainCategory[]): HTMLElement {
    const navTemplate = template.nav;

    const nav = stringToDOM(navTemplate);

    const feedsContainer = nav.querySelector(".links ul");
    const dropdownContainer = nav.querySelector("#dropdowns");

    links.forEach((link) =>
      feedsContainer.append(this.createLinkLiItem(link))
    );

    dropdowns.forEach((dropdown) => {
      dropdownContainer.append(
        document.createElement("hr"),
        Dropdown.create(dropdown.label, dropdown.id, dropdown.items)
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

function getUserProfileLink():string{
  const username = filterCookieValue("username", "user");

  if(username){
    return "/profile/" + username;
  } else {
    return "/";
  }
}