import { deleteContentBtn } from "./templates/delete-content-btn.js";
import { replace, stringToDOM } from "../../utilities/templateUtils.js";

class DeleteContentBtn {
    static create(typeOfContent:string):HTMLButtonElement{
      let button = deleteContentBtn
      button = replace(button, [{pattern: 'typeOfContent', replacement: typeOfContent}] )
      return stringToDOM(button);
    }
}

export{DeleteContentBtn}