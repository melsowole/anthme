import { main } from "./components/templates/profile-page.js";
import { stringToDOM } from "../utilities/templateUtils.js";
import Header from "./components/Header.js"
import MainNav from "./components/MainNav.js";
import * as userImg from "../utilities/userImgUtils.js"
import * as api from "../api.js"
import { User } from "../utilities/pathTypes.js";

function displayProfile() {
    const profilepage: HTMLElement = stringToDOM(main);
    const header = Header.create();
    const mainNav = MainNav.create();
  
    document.body.append(
        profilepage,
        mainNav,
        header
    )

    const userInfoContainer = profilepage.querySelector('.userInfoItem') as HTMLDivElement;
    const userPageLinks = profilepage.querySelectorAll('.userPageLink') as NodeListOf<HTMLAnchorElement>;

    const urlParts: string[] = window.location.pathname.split('/');
    const urlPathEndpoint: string = urlParts[urlParts.length - 1];

    api.getUserByUsername(urlPathEndpoint)
        .then(user => {
            if (user) {
                displayUserProfile(user, userInfoContainer);
            }
            else {
                console.log(`Ingen användare hittades`);
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });

    userPageLinks.forEach(userPageLink => {
        userPageLink.addEventListener('click', () => {
            userPageLinks.forEach(link => {
                link.classList.remove('addGreyBGColor');
            });
    
            userPageLink.classList.add('addGreyBGColor');
        });
    });
}

function displayUserProfile(user: User, container: HTMLDivElement): void {
    const userNameEl = document.createElement('h2');
    userNameEl.innerText = user.username;
    container.append(userNameEl);

    const userImageUrl = userImg[user.userImage] || userImg.donut;
    console.log(userImageUrl)
    const userImage = new Image();
    userImage.src = userImageUrl;
    container.appendChild(userImage);
}


export{displayProfile, displayUserProfile}

