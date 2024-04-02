import * as template from "./templates/post-form-dropdown";
import { replace, stringToDOM } from "../../utilities/templateUtils";
import { Category } from "../../utilities/types";

class PostFormDropdownOption {
    static create(category: Category): HTMLOptionElement {
        let categoryOption = template.categoryOption;
        
        categoryOption = replace(categoryOption, [
            {pattern: 'categoryValue', replacement: category.name},
            {pattern: 'categoryName', replacement: category.name}
        ])

        return stringToDOM(categoryOption);
    }
}

export default PostFormDropdownOption