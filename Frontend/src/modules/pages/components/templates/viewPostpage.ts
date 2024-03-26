const main = `
<main class="main-feed">
    <div class="userInfoItem"></div> 

    <div class="titleDiv"></div>

    <div class="interactionContainer">
        <span class="outerSpan">
            <button class="buttonUpp"> 
                <i class="fi fi-ts-up"></i> 
            </button>
            <span class="amountOfLikes">9</span>
            <button class="buttonDown">
                <i class="fi fi-ts-down"></i>
            </button>

        </span>

        <span class="commentSpan">
            <button class="buttonComments">
                <i class="fa-regular fa-message fa-lg" ></i>
            </button>
            <span class="amountOfComments">71</span>
        </span>    
    </div>

    <div class="commentBtn">
        <button class="addCommentBtn"><i class="fi fi-rr-plus"></i> Add a Comment</button>
    </div>

    <div class="commentContainer">

        <div class="commentInfo"></div>
        

    </div>

</main>


`

export {main}