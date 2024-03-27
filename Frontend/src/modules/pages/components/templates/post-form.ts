const mainContainer: string = 
`
<main id="mainContainer">
    <div class="background-container">
        <div id="postContainer">
            <div class="post-heading">
                <h2>Create a post</h2>
            </div>
            <form id="postForm">
                <div class="category-container">
                    <select name="category">
                        <option value="" disabled selected>Choose a community</option>
                    </select>
                </div>
                <div class="post-content-form">
                    <input type="text" id="" class="input" name="title" placeholder="Title" required>
                    <div class="post-content">
                        <div class="text-features">
                            <span>Bold</span>
                            <span>Italic</span>
                        </div>
                        <div class="textarea" contenteditable="true" role="textbox" data-placeholder="Text"></div>
                    </div>
                    <div class="post-content-form-footer">
                        <button class="submit-btn">Post</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</main>
`;

// <input type="text" id="" class="input" name="category" placeholder="Category">

export {mainContainer}