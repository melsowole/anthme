import createPostContainer from "../postForm.ts";
import { stringToDOM } from "../../modules/template-utils.ts";

export default class PostForm {
    static createDOM(): HTMLDivElement {
        return stringToDOM(createPostContainer)
    }
}