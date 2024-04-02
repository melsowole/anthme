const postPage = `
<main class="main-feed">
    <article id="__postId__" class="post-container">
        <div class="user-info-container">
            <div class="user-img-container"></div>
            <div class="user-infoitem"></div> 
        </div>
        
        <div class="content-div"></div>

        <div class="interaction-container">
            <span class="outer-span">
                <button class="button-up"> 
                    <i class="fi fi-ts-up"></i> 
                </button>
                <span class="rating">__rating__</span>
                <button class="button-down">
                    <i class="fi fi-ts-down"></i>
                </button>
            </span>

            <span class="comment-span">
                <a href="#comments">
                    <button class="button-comments">
                        <i class="fa-regular fa-message fa-lg" ></i>
                    </button>
                    <span class="amount-of-comments"></span>
                </a>
            </span>    
        </div>
    </article>

    <div class="comment-btn">
        <button class="add-comment-btn"><i class="fi fi-rr-plus"></i> Add a Comment</button>
    </div>

    <form class="comment-form">
        <div class="textarea-container hide">
            <textarea name="body" class="comment-input" cols="50" rows="4" required></textarea>
            <button class="cancel-button">Cancel</button>
            <button id="addCommentBtn" class="submit-button">Comment</button>
        </div>
    </form>
   
    <div id= "comments" class="comment-container">

        <div class="comment-info"></div>
        

    </div>

</main>


`

export {postPage}