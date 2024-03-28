import Header from "./components/Header.ts";
import MainNav from "./components/MainNav.ts";
import MainFeedUsers from "./components/MainFeedUsers.ts";
import { generateDropdowns } from "../utilities/dropdownUtils.ts";

async function displayUsersPage(users: []): Promise<void> {
    const mainNavDropdowns = await generateDropdowns();
    document.body.append(
        Header.create(),
        MainNav.create(mainNavDropdowns),
        MainFeedUsers.create(users)
    );
}

export {displayUsersPage}