import * as template from "./templates/main-aside";
import { stringToDOM } from "../../utilities/templateUtils";

export default class Sidebar{
    static create(content: HTMLElement[]): HTMLElement{
        const aside = stringToDOM(template.aside);

        const sidebar = aside.querySelector(".sidebar") as HTMLElement;

        content.forEach(el => sidebar.append(el))

        return aside;
    }
}