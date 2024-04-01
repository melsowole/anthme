import Noticeboard from "./Noticeboard";
import * as api from "../../api.ts";
import UserProfile from "./UserProfile";
import {User} from "../../utilities/pathTypes.ts"

export default class UserNoticeboard{
    private static visibleUsersN = 5;

    static async create(): Promise<HTMLElement>{
        const users = await api.getAllUsers();
        console.log(this.visibleUsersN)

        const header = "Users";
        const itemsArray=  this.createItemsArray(users);

        return Noticeboard.create(header, itemsArray);
    }

    private static createItemsArray(users: User[]):any[]{
        if(users.length == 0 ) return ["No users..."];

        const firstNUsers = users.slice(0, this.visibleUsersN);

        const userArray = firstNUsers.map((u: User) =>
            UserProfile.createPreview(u.username, u.userImage)
        );

        const seeMore = document.createElement("a");
        seeMore.textContent = "See All Users";
        seeMore.href = "/users";

        userArray.push(seeMore);

        return userArray;
    }
}