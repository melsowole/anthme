import * as template from "./templates/main-feed.js";
import { userListContainer } from "./templates/user-list.js";
import {replace, stringToDOM} from "../../utilities/templateUtils.js";
import UserList from "./UserList.js";
import { User } from "../../utilities/types.js";

export default class UserDirectory {
    static create(users: User[]) {
        const templateFeed = replace(template.feed, [
            {pattern: 'sort', replacement: 'Newest'},
            {pattern: 'containerType', replacement: 'users'}
        ])
        
        const main = stringToDOM(templateFeed);
        const ul = stringToDOM(userListContainer);

        users.forEach(user => {
            ul.append(UserList.create(user), document.createElement("hr"))
        })
        
        main.querySelector('#users').append(ul)

        return main
    }
}