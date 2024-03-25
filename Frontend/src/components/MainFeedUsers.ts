import * as template from "../templates/main-feed.js";
import { replace, stringToDOM } from "../modules/template-utils.js";

export default class MainFeedUsers {
    static create(users: string[]) {
        const templateFeed = replace(template.feed, [
            {pattern: 'sort', replacement: 'Newest'},
            {pattern: 'containerId', replacement: 'users'}
        ])
        
        const main = stringToDOM(templateFeed)
        
        console.log(users);
        

        return main
    }
}