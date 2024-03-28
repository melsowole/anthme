import {div} from "../templates/landingpage.js"
import{main} from "../templates/profilepage.js"
import { stringToDOM } from "./template-utils.js";

let landingpageTemplate = div;
const landingpage : HTMLElement = stringToDOM(landingpageTemplate);

function displayLandingPage(){
document.body.append(landingpage)
}

function displayProfile(){
    const container = document.querySelector('.landingPageContainer');
    let profileTemplate = main;
    const profilepage: HTMLElement = stringToDOM(profileTemplate);
   container.append(profilepage);
}
function cleanLandingPage(){
    landingpage.innerHTML = "";
}


export{displayLandingPage, cleanLandingPage, displayProfile}