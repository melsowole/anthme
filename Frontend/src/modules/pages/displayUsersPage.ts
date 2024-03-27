import Header from "./components/Header.ts";
import MainNav from "./components/MainNav.ts";
import MainFeedUsers from "./components/MainFeedUsers.ts";

function displayUsersPage(users: []): void {
    document.body.append(
        Header.create(),
        MainNav.create(),
        MainFeedUsers.create(users)
    );
}

export {displayUsersPage}