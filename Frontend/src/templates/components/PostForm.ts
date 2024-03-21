import createPostContainer from "../postForm.ts";
import { stringToDOM } from "../../modules/template-utils.ts";

class PostForm {
    static createDOM(): HTMLDivElement {
        return stringToDOM(createPostContainer)
    }
}

export {PostForm}