import{filterCookieValue} from "./cookieUtils.js"
import{DeleteContentBtn} from "../pages/components/DeleteContentBtn.js"
function createDeleteContentBtn():HTMLButtonElement{

    return DeleteContentBtn.create();
}

export{createDeleteContentBtn}