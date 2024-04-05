import UserDirectory from "./components/UserDirectory";
import * as api from "../api.js"
import PageLayout from "./components/PageLayout.js";

async function displayUsersPage(): Promise<void> {
    const users = await api.getAllUsers()

    const pageLayout = new PageLayout();
    await pageLayout.create(UserDirectory.create(users))

}

export {displayUsersPage}