import { Rating } from "./types.js";

function updateRating(postRating: Rating, postContainer: HTMLDivElement): void {
    const ratingEl = postContainer.querySelector('.rating') as HTMLSpanElement;
    ratingEl.innerHTML = '';
    ratingEl.innerText = (postRating.upvotes.length - postRating.downvotes.length).toString();
}

function updateBGColor(target: HTMLElement): void {
    const ratingContainer = target.closest('.outer-span') as HTMLSpanElement;
    console.log(ratingContainer);
    

    if(target.closest('.button-up')) {
        if(ratingContainer.classList.contains('downvote-active')) {
            ratingContainer.classList.remove('downvote-active');
        }
        ratingContainer.classList.toggle('upvote-active');
    }
    else if(target.closest('.button-down')) {
        if(ratingContainer.classList.contains('upvote-active')) {
            ratingContainer.classList.remove('upvote-active');
        }
        ratingContainer.classList.toggle('downvote-active');
    }
}

export {updateRating, updateBGColor,}