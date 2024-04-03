import { Rating } from "./types.js";

function updateRating(postRating: Rating, postContainer: HTMLDivElement): void {
    const ratingEl = postContainer.querySelector('.rating-count') as HTMLSpanElement;
    ratingEl.innerHTML = '';
    ratingEl.innerText = (postRating.upvotes.length - postRating.downvotes.length).toString();
}

function updateBGColor(target: HTMLElement | SVGElement): void {
    const ratingContainer = target.closest('.rating') as HTMLSpanElement;
    
    if(target.closest('.upvote')) {
        if(ratingContainer.classList.contains('downvote-active')) {
            ratingContainer.classList.remove('downvote-active');
        }
        ratingContainer.classList.toggle('upvote-active');
    }
    else if(target.closest('.downvote')) {
        if(ratingContainer.classList.contains('upvote-active')) {
            ratingContainer.classList.remove('upvote-active');
        }
        ratingContainer.classList.toggle('downvote-active');
    }
}

export {updateRating, updateBGColor}