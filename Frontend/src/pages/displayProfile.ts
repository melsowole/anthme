import { main } from "../templates/profilepage.js";
import { stringToDOM } from "../modules/template-utils.js";
import { User, getAllUsers } from '../modules/fetchUsers.js';
import Header from "../components/Header.js"
import MainNav from "../components/MainNav.js";
import {filterCookieValue} from "../modules/cookieUtils.js"

//Till cookies
//console.log(filterCookieValue('id', 'user'))

const bananaUrlObj = new URL("../img/userImgBanana.png", import.meta.url);
const pizzaUrlObj = new URL("../img/userImgPizza.png", import.meta.url);
const dounatUrlObj = new URL("../img/userImgDounat.png", import.meta.url);

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

    getAllUsers()
    .then(users => {
        const userId = "7fdd2943-3fd9-44c8-aa3d-618f117ed6dd"; 

        const user = users.find(user => user.id === userId);
        if (user) {
            console.log(user.id);
            displayUserProfile(user, userInfoContainer);
        } else {
            console.log(`Ingen användare hittades med ID: ${userId}`);
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

    const userImageConfig = {
        pizza: pizzaUrlObj.href,
        banana: bananaUrlObj.href,
        dounat: dounatUrlObj.href
    };

    const userImageUrl = userImageConfig[user.userImage] || dounatUrlObj.href;
    console.log(userImageUrl)
    const userImage = new Image();
    userImage.src = userImageUrl;
    container.appendChild(userImage);
}


export{displayProfile, displayUserProfile}

