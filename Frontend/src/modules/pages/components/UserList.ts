import * as template from "./templates/user-list.ts";
import {replace, stringToDOM} from "../../utilities/templateUtils.ts";
import dayjs from "dayjs";

type User = {
    id: string;
    username: string;
    userImage: string;
    created: number;
    posts: string[];
    comments: string[];
}

export default class UserList {
    static create(user: User): HTMLLIElement {
        let userList = template.userList;
        
        userList = replace(userList, [
            {pattern: 'userimage', replacement: user.userImage},
            {pattern: 'userId', replacement: user.id},
            {pattern: 'username', replacement: user.username},
            {pattern: 'href-username', replacement: user.username},
            {pattern: 'userDateCreated', replacement: dayjs(user.created).format('DD MMMM YYYY')},
            {pattern: 'amountOfPosts', replacement: user.posts.length.toString()},
            {pattern: 'amountOfComments', replacement: user.comments.length.toString()}
        ])

        return stringToDOM(userList)
    }
}