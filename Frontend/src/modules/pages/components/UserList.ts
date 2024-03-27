import * as template from "./templates/user-list.js";
import {replace, stringToDOM} from "../../utilities/templateUtils.js";
import dayjs from "dayjs";
import { User } from "../../utilities/pathTypes";



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