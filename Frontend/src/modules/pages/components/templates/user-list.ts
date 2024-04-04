const userListContainer = `<ul class="users-wrapper"></ul>`

const userList = 
`
<li id="__userId__" class="user-list post preview boxed">
    <a class="unstyle" href="/profile/__href-username__">
        <header class="user-list-header">
            <img src="__userimage__"/>
            <h2>__username__</h2>
            <span>came to earth</span>
            <span class="user-date-created">__userDateCreated__</span>
        </header>
        <footer class="user-list-footer">
            <ul class="user-list-footer-lists">
                <li>
                    <span class="pill long unstyle">
                        <small>
                            <span class="icon material-symbols-outlined">post</span>
                            __amountOfPosts__ Posts
                        </small>
                    </span>
                </li>
                <li>
                    <span class="pill long unstyle">
                        <small>
                            <span class="icon material-symbols-outlined">comment</span>
                            __amountOfComments__ Comments
                        </small>
                    </span>
                </li>
            </ul>
        </footer>
    </a>
</li>
<hr>
`

// lägg till senare
// <img src="__userimage__"/>

export {userListContainer, userList}