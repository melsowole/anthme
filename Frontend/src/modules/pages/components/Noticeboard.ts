import * as template from "./templates/post-noticeboard.ts";
import {
  replace,
  stringToDOM,
  ReplacePair,
} from "../../utilities/templateUtils.ts";

export default class Noticeboard {
  static create(
    headerContent: string,
    itemsArray: string[] | HTMLElement[]
  ): HTMLDivElement {
    const headerTemp = replace(template.noticeboard, [
      { pattern: "header", replacement: headerContent },
    ]);
    const noticeboardEl = stringToDOM(headerTemp) as HTMLDivElement;
    const orderedListEl = noticeboardEl.querySelector("ol") as HTMLOListElement;

    itemsArray.forEach((item: string | HTMLElement) => {
      let itemTemp = isHTMLElement(item)
        ? template.listItemFree
        : template.listItem;

      let listItemEl: HTMLElement;

      if (isHTMLElement(item)) {
        listItemEl = stringToDOM(itemTemp);
        listItemEl.append(item);
      } else {
        itemTemp = replace(itemTemp, [
          { pattern: "textContent", replacement: item },
        ]);
        listItemEl = stringToDOM(itemTemp);
      }

      orderedListEl.append(listItemEl);
    });

    return noticeboardEl;
  }
}

function isHTMLElement(item: string | HTMLElement): item is HTMLElement {
  return typeof item !== "string";
}
