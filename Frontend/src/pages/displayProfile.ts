import{main} from "../templates/profilepage.js"
import { stringToDOM } from "../modules/template-utils.js";

function displayProfile(){
    const container = document.querySelector('.landingPageContainer') as HTMLDivElement
    let profileTemplate = main;
    const profilepage: HTMLElement = stringToDOM(profileTemplate);
   container.append(profilepage);
}

export{displayProfile}