import * as template from "./templates/post-noticeboard.ts";
import {
  replace,
  stringToDOM,
  ReplacePair,
} from "../../utilities/templateUtils.ts";

type LinkItem = {
  link: string;
  text: string;
};

type ListItem = string;

export default class Noticeboard {
  static createDOM(
    headerContent: string,
    itemsArray: LinkItem[] | ListItem[]
  ): HTMLDivElement {
    const headerTemp = replace(template.noticeboard, [
      { pattern: "header", replacement: headerContent },
    ]);
    const noticeboardEl = stringToDOM(headerTemp) as HTMLDivElement;
    const orderedListEl = noticeboardEl.querySelector("ol") as HTMLOListElement;

    itemsArray.forEach((item: LinkItem | ListItem) => {
      let itemTemp = isLinkItem(item)
        ? template.listItemLink
        : template.listItem;

      let replacements: ReplacePair[];

      if (isLinkItem(item)) {
        replacements = [
          { pattern: "textContent", replacement: item.text },
          { pattern: "link", replacement: item.link },
        ];
      } else {
        replacements = [{ pattern: "textContent", replacement: item }];
      }

      itemTemp = replace(itemTemp, replacements);

      const listItemEl = stringToDOM(itemTemp) as HTMLLIElement;

      orderedListEl.append(listItemEl);
    });

    return noticeboardEl;
  }
}

function isLinkItem(item: LinkItem | ListItem): item is LinkItem {
  return typeof item === "object";
}
