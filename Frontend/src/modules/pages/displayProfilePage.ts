import { main } from "./components/templates/profile-page.js";
import { stringToDOM } from "../utilities/templateUtils.js";
import Header from "./components/Header.js";
import MainNav from "./components/MainNav.js";
import * as userImg from "../utilities/userImgUtils.js";
import * as api from "../api.js";
import { deleteCookie } from "../utilities/cookieUtils.js";
import { User } from "../utilities/pathTypes.js";
import dayjs from "dayjs";
import { getPostByUser, getCommentsByUser } from "../api.js";
import { displayUserImage } from "./displayPostPage";
import { Post, Comments } from "../utilities/pathTypes.js";
import { generateDropdowns } from "../utilities/dropdownUtils.js";

async function displayProfile(): Promise<void> {
  const mainNavDropdowns = await generateDropdowns();
  const profilepage: HTMLElement = stringToDOM(main);
  const header = Header.create();
  const mainNav = MainNav.create(mainNavDropdowns);

  document.body.append(profilepage, mainNav, header);

  const userInfoContainer = profilepage.querySelector(
    ".userInfo"
  ) as HTMLDivElement;
  const userPageLinks = profilepage.querySelectorAll(
    ".userPageLink"
  ) as NodeListOf<HTMLAnchorElement>;
  const postLink = document.querySelector(".postLink") as HTMLAnchorElement;
  const commentsLink = document.querySelector(
    ".commentsLink"
  ) as HTMLAnchorElement;
  const container = document.querySelector(
    ".commentContainer"
  ) as HTMLDivElement;

  const urlParts: string[] = window.location.pathname.split("/");
  const urlPathEndpoint: string = urlParts[urlParts.length - 1];

  await api
    .getUserByUsername(urlPathEndpoint)
    .then(async (user) => {
      console.log(user);
      postLink.classList.add("addGreyBGColor");

      await getPostByUser(user.id).then((posts) => {
        displayContent(container, posts, userImg);
      });

      if (user) {
        displayUserProfile(user, userInfoContainer);
      } else {
        console.log(`Ingen användare hittades`);
      }

      const deleteAccountBtn = document.querySelector(
        ".delAccountBtn"
      ) as HTMLButtonElement;

      postLink.addEventListener("click", handlePostLink);
      commentsLink.addEventListener("click", handleCommentsLink);
      deleteAccountBtn.addEventListener("click", handleDeleteAccount);

      userPageLinks.forEach((userPageLink) => {
        userPageLink.addEventListener("click", () => {
          handleUserPageLink(userPageLink);
        });
      });

      function handlePostLink(): void {
        container.innerHTML = "";

        getPostByUser(user.id).then((posts) => {
          container.innerHTML = "";
          displayContent(container, posts, userImg);
        });
      }

      function handleCommentsLink(): void {
        container.innerHTML = "";

        getCommentsByUser(user.id).then((comments) => {
          container.innerHTML = "";
          displayContent(container, comments, userImg);
        });
      }

      function handleDeleteAccount(): void {
        alert(
          "Are you sure that you want to delete your account? This can not be undone."
        );
        api.deleteAccount(user.id).then(() => {
          logOut();
        });
      }

      function handleUserPageLink(clickedLink: HTMLElement): void {
        userPageLinks.forEach((link) => {
          link.classList.remove("addGreyBGColor");
        });

        clickedLink.classList.add("addGreyBGColor");
      }
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}

function logOut() {
  deleteCookie("user");
  window.location.href = "/";
}

function displayUserProfile(user: User, container: HTMLDivElement): void {
  container.innerHTML = "";
  const userInfo = document.createElement("div");
  const userNameEl = document.createElement("h2");
  userNameEl.innerText = user.username;
  const deleteAccountBtn = document.createElement("button");
  deleteAccountBtn.innerText = "Delete account";
  deleteAccountBtn.classList.add("delAccountBtn");

  const userImageUrl = userImg[user.userImage] || userImg.donut;
  const userImage = new Image();
  userImage.src = userImageUrl;

  userInfo.append(userImage, userNameEl);
  container.append(userInfo, deleteAccountBtn);
}

function displayContent(
  container: HTMLElement,
  items: (Post | Comments)[],
  userImg: Record<string, string>
) {
  container.innerHTML = "";

  items.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("commentItem");

    const timeStampEl = document.createElement("small");
    timeStampEl.classList.add("timeStampEl");
    timeStampEl.innerText = dayjs(item.created).format("DD MMMM YYYY");

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("imgDiv");

    const itemBody = document.createElement("div");
    itemBody.classList.add("commentBody");

    const usernameEl = document.createElement("h2");
    usernameEl.innerText = item.user.username;

    const contentEl = document.createElement("p");
    contentEl.innerText = item.body;

    if (item.user.userImage === "pizza") {
      displayUserImage(imgDiv, userImg.pizza);
    } else if (item.user.userImage === "donut") {
      displayUserImage(imgDiv, userImg.donut);
    } else {
      displayUserImage(imgDiv, userImg.banana);
    }

    itemBody.appendChild(contentEl);
    imgDiv.append(timeStampEl, usernameEl);
    itemElement.append(imgDiv, itemBody);

    container.append(itemElement);
  });
}

export { displayProfile, displayUserProfile };
