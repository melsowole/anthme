import Header from "./Header.ts";
import MainNav from "./MainNav.ts";
import MainFeedUsers from "./MainFeedUsers.ts";

function displayUsersPage(users: []): void {
    document.body.append(
        Header.create(),
        MainNav.create(),
        MainFeedUsers.create(users)
    );
}

export {displayUsersPage}