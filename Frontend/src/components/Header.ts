import * as template from "../templates/main-header.js";
import { replace, stringToDOM } from "../modules/template-utils.js";

export default class Header {
  static create() {
    const headerTemplate = template.header;

    return stringToDOM(headerTemplate);
  }
}