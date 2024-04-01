import { filterCookieValue } from "./cookieUtils.ts";
import { Post } from "./types.ts";

// Only takes one post as argument to reuse function
function addRatingClassToAuthUser(post: Post) {
    const loggedInUserId = filterCookieValue('id', 'user');

    // posts.forEach(post => {
    // })
    const hasUserUpvoted = post.rating.upvotes.includes(loggedInUserId)
    const hasUserDownvoted = post.rating.downvotes.includes(loggedInUserId)
    
    if(hasUserUpvoted || hasUserDownvoted) {
        const postContainer = document.body.querySelector(`[id="${post.id}"]`) as HTMLElement;
        const ratingContainer = postContainer.querySelector('.outerSpan') as HTMLSpanElement;
        
        if(hasUserUpvoted) {
            ratingContainer.classList.add('upvote-active');
        }
        else {
            ratingContainer.classList.add('downvote-active');
        }
    }
}

export {addRatingClassToAuthUser}