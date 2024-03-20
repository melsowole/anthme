function displayPostPage() {
    const mainContainer = document.querySelector('#mainContainer') as HTMLDivElement;

    mainContainer.innerHTML = 
        `<div id="postContainer">
            <div class="post-heading">
                <h2>Create a post</h2>
            </div>
            <form id="postForm">
                <div class="category-input">
                    <input type="text" id="" class="input" name="category" placeholder="Category">
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
        <div id="sidebarContainer">
            <div class="sidebar">
                <h2 class="bottom-border">Posting to anthme</h2>
                <ol>
                    <li class="bottom-border">Remember the human</li>
                    <li class="bottom-border">Behave like you would in real life</li>
                    <li class="bottom-border">Look for the original source of content</li>
                    <li class="bottom-border">Search for duplicates before posting</li>
                    <li class="bottom-border">Read the community's rules</li>
                </ol>
            </div>
        </div>`
}

export {displayPostPage}