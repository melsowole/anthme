import { main } from "./components/templates/profile-page.js";
import { stringToDOM } from "../utilities/templateUtils.js";
import Header from "./components/Header.js";
import MainNav from "./components/MainNav.js";
import * as userImg from "../utilities/userImgUtils.js";
import * as api from "../api.js";
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

  document.body.append(profilepage, mainNav, header);

  const urlParts: string[] = window.location.pathname.split("/");
  const urlPathEndpoint: string = urlParts[urlParts.length - 1];

  const postLink = document.querySelector(".postLink") as HTMLAnchorElement;
  const commentsLink = document.querySelector(
    ".commentsLink"
  ) as HTMLAnchorElement;
  const container = document.querySelector(
    ".commentContainer"
  ) as HTMLDivElement;
  container.innerHTML = "";

  console.log(urlPathEndpoint);
  await api
    .getUserByUsername(urlPathEndpoint)
    .then(async (user) => {
      console.log(user);
      postLink.classList.add("addGreyBGColor");

      await getPostByUser(user.id).then((posts) => {
        container.innerHTML = "";
        displayContent(container, posts, userImg);
      });

      if (user) {
        displayUserProfile(user, userInfoContainer);
      } else {
        console.log(`Ingen användare hittades`);
      }

      postLink.addEventListener("click", () => {
        console.log("postLink");
        container.innerHTML = "";
        getPostByUser(user.id).then((posts) => {
          container.innerHTML = "";
          displayContent(container, posts, userImg);
          console.log(user.id);
        });
      });
      commentsLink.addEventListener("click", () => {
        console.log("commentsLink");
        container.innerHTML = "";
        getCommentsByUser(user.id).then((comments) => {
          container.innerHTML = "";
          console.log(comments);
          displayContent(container, comments, userImg);
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });

  api
    .getUserByUsername(urlPathEndpoint)
    .then((user) => {
      if (user) {
        displayUserProfile(user, userInfoContainer);
      } else {
        console.log(`Ingen användare hittades`);
      }
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}

function displayUserProfile(user: User, container: HTMLDivElement): void {
  container.innerHTML = "";
  const userNameEl = document.createElement("h2");
  userNameEl.innerText = user.username;
  container.append(userNameEl);

  const userImageUrl = userImg[user.userImage] || userImg.donut;
  console.log(userImageUrl);
  const userImage = new Image();
  userImage.src = userImageUrl;
  container.appendChild(userImage);
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
