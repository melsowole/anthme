import createPostContainer from "../templates/post-form.js";
import { stringToDOM } from "../modules/template-utils.js";

export default class PostForm {
    static createDOM(): HTMLDivElement {
        return stringToDOM(createPostContainer)
    }
}
