import * as template from "./templates/main-header.js";
import {replace, stringToDOM} from "../../utilities/templateUtils.ts";
import { getCookie } from "../../utilities/cookieUtils.ts";

export default class Header {
  static create() {
    const headerTemplate = template.header;

    const header = stringToDOM(headerTemplate);

    header
      .querySelector(".user")
      .addEventListener("click", toggleUserProfileMenu);

    return header;
  }
}

function toggleUserProfileMenu(): void {
  const profileMenu = document.querySelector(".profile-menu") as HTMLElement;

  if (profileMenu) {
    profileMenu.remove();
  } else {
    document.body.append(userProfileMenu());
  }
}

function userProfileMenu(): HTMLElement {
  let menuTemplate = template.profileMenu;

  // TODO: GET COOKIE USERNAME AND REPLACE
  menuTemplate = replace(menuTemplate, [
    { pattern: "username", replacement: "" },
  ]);

  return stringToDOM(menuTemplate);
}
