import MainFeedUsers from "./components/UserDirectory";
import * as api from "../api.js"
import PageLayout from "./components/PageLayout.js";

async function displayUsersPage(): Promise<void> {
    const users = await api.getAllUsers()

    const pageLayout = new PageLayout();
    pageLayout.create(MainFeedUsers.create(users))

}

export {displayUsersPage}