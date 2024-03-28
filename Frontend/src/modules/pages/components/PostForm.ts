import * as template from "./templates/post-form.ts";
import PostFormDropdownOption from "./PostFormDropdownOption.ts";
import {replace, stringToDOM} from "../../utilities/templateUtils.ts";
import { Category } from "../../utilities/pathTypes.ts";

export default class PostForm {
    static create(categories: Category[]): HTMLDivElement {
        const mainContainerEl = stringToDOM(template.mainContainer);
        const postFormDropdown = mainContainerEl.querySelector('.category-container > select') as HTMLSelectElement;

        categories.forEach(category => {
            postFormDropdown.append(PostFormDropdownOption.create(category))
        })

        return mainContainerEl;
    }
}
