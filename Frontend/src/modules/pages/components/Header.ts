import * as template from "./templates/main-header.js";
import { replace, stringToDOM } from "../../utilities/templateUtils.ts";
import {
  filterCookieValue,
  deleteCookie,
} from "../../utilities/cookieUtils.ts";
import * as api from "../../api.ts";
import UserProfile from "./UserProfile.ts";

export default class Header {
  static create() {
    const headerTemplate = template.header;

    const header = stringToDOM(headerTemplate);

    const user = UserProfile.createProfileImg(
      filterCookieValue("userimage", "user")
    );

    header.append(user);

    user.addEventListener("click", toggleUserProfileMenu);

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

  menuTemplate = replace(menuTemplate, [
    { pattern: "username", replacement: filterCookieValue("username", "user") },
  ]);

  const menuDOM = stringToDOM(menuTemplate);

  menuDOM
    .querySelector("button#log-out")
    .addEventListener("click", promptLogOut);
  menuDOM
    .querySelector("button#delete-account")
    .addEventListener("click", promptDeleteAccount);

  return menuDOM;
}

function promptLogOut() {
  const prompt = "Are you sure you want to sign out?";
  if (window.confirm(prompt)) {
    logOut();
  }
}

function promptDeleteAccount() {
  const prompt =
    "Are you sure you want to delete you account?\nThis action cannot be undone.";
  if (window.confirm(prompt)) {
    deleteAccount();
  }
}

function logOut() {
  deleteCookie("user");
  window.location.href = "/";
}

async function deleteAccount() {
  console.log(filterCookieValue("id", "user"));
  await api.deleteAccount(filterCookieValue("id", "user"));
  logOut();
}
