import MainFeed from "./components/MainFeed.js";
import * as api from "../api.js";
import { Category } from "../utilities/types.js";
import { applyUserFeedbackClassToContent } from "../utilities/loggedInUserUtils.js";
import * as rating from "../utilities/footerContentUtils.js";
import PageLayout from "./components/PageLayout.js";

export default async function displayHomePage() {
    let posts = await api.getAllPosts();
    
    const category : false | Category = await getPageCategory()

    if(category){
        posts = posts.filter(p=>p.category == category.name);
    }

    const pageLayout = new PageLayout();
    await pageLayout.create(MainFeed.create(posts, category))

    posts.forEach(applyUserFeedbackClassToContent)

    const postsContainer = document.querySelector('#posts') as HTMLDivElement;
    postsContainer.addEventListener('click', rating.handleFooterContent)
}

async function getPageCategory():Promise<Category|false>{
    const categoryName = getPageURLParam();

    if(!categoryName) return false;

    return await api.getCategory(categoryName)
}

function getPageURLParam() :string{
    const urlParts: string[] = window.location.pathname.split("/");
    const urlPathEndpoint: string = urlParts[urlParts.length - 1];
    return urlPathEndpoint;
}