import MainFeed from "./components/MainFeed.ts";
import * as api from "../api.ts";
import { Category } from "../utilities/types.ts";
import { filterCookieValue } from "../utilities/cookieUtils.ts";
import { addRatingClassToAuthUser } from "../utilities/authenticatedUserUtils.ts";
import * as rating from "../utilities/ratingVoteUtils.ts";
import PageLayout from "./components/PageLayout.ts";

export default async function displayHomePage() {
    let posts = await api.getPosts();
    
    const category : false | Category = await getPageCategory()

    if(category){
        posts = posts.filter(p=>p.category == category.name);
    }

    const pageLayout = new PageLayout();

    pageLayout.create(MainFeed.create(posts, category))
    
    posts.forEach(addRatingClassToAuthUser)

    const postsContainer = document.querySelector('#posts') as HTMLDivElement;
    postsContainer.addEventListener('click', async (event) => {
        const {target} = event;

        if(!(target instanceof HTMLElement)) return; // Narrow down the types on target so it won't complain
        
        if(target.id !== 'posts') {
            let id:string;

            if(target.closest('.outerSpan')) {
                event.preventDefault();
                const postContainer = target.closest('.post.preview') as HTMLDivElement;
                const loggedInUserId = filterCookieValue('id', 'user');
                id = target.closest('.post.preview')!.id;

                if(target.closest('.buttonUp')) {
                    await api.updateUpvotes(id, loggedInUserId)
                        .then(postRating => {
                            rating.updateRating(postRating, postContainer);
                            rating.updateBGColor(target);
                        });
                }
                else if(target.closest('.buttonDown')) {
                    await api.updateDownvotes(id, loggedInUserId)
                        .then(postRating => {
                            rating.updateRating(postRating, postContainer);
                            rating.updateBGColor(target);
                        });
                }
            }
            // Add logic for Share button on post
            else return;
        }
    });
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