import * as template from "./templates/post-noticeboard.ts";
import {
  replace,
  stringToDOM,
  ReplacePair,
} from "../../utilities/templateUtils.ts";

export default class Noticeboard {
  static create(
    headerContent: string,
    itemsArray: string[] | HTMLElement[],
    itemsN: number = itemsArray.length
  ): HTMLDivElement {
    const headerTemp = replace(template.noticeboard, [
      { pattern: "header", replacement: headerContent },
    ]);
    const noticeboardEl = stringToDOM(headerTemp) as HTMLDivElement;
    const orderedListEl = noticeboardEl.querySelector("ol") as HTMLOListElement;

    for (let i = 0; i < itemsN || i == itemsArray.length; i++) 
      orderedListEl.append(this.createItem(itemsArray[i]));

    return noticeboardEl;
  }

  private static createItem(item: string | HTMLElement):HTMLElement{
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

    return listItemEl
  }

}

function isHTMLElement(item: string | HTMLElement): item is HTMLElement {
  return typeof item !== "string";
}
