import createPostContainer from "./templates/post-form.ts";
import {replace, stringToDOM} from "../../utilities/templateUtils.ts";

export default class PostForm {
    static createDOM(): HTMLDivElement {
        return stringToDOM(createPostContainer)
    }
}
