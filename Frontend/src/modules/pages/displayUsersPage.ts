import Header from "./components/Header.ts";
import MainNav from "./components/MainNav.ts";
import MainFeedUsers from "./components/MainFeedUsers.ts";
import { generateDropdowns } from "../utilities/dropdownUtils.ts";
import * as api from "../api.ts"

async function displayUsersPage(): Promise<void> {
    const mainNavDropdowns = await generateDropdowns();
    const users = await api.getAllUsers()

    document.body.append(
        Header.create(),
        MainNav.create(mainNavDropdowns),
        MainFeedUsers.create(users)
    );
}

export {displayUsersPage}