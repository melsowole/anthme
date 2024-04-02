import MainFeedUsers from "./components/MainFeedUsers.ts";
import * as api from "../api.ts"
import PageLayout from "./components/PageLayout.ts";

async function displayUsersPage(): Promise<void> {
    const users = await api.getAllUsers()

    const pageLayout = new PageLayout();
    pageLayout.create(MainFeedUsers.create(users))

}

export {displayUsersPage}