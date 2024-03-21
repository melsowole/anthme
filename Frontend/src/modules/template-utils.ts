type ReplacePair = {
  pattern: string;
  replacement: string;
};

// replace("<a>__hello__ __name__</a>", [{pattern:"hello", replacement:"hi"}])


const replace = (input: string, replacePairs: ReplacePair[]): string => {
  let output = input;
  replacePairs.forEach((pair) => {
    output = output.replace(
      new RegExp(`__${pair.pattern}__`, "g"),
      pair.replacement
    );
  });
  return output;
};

const stringToDOM = (htmlString: string): any => {
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlString, "text/html");
  return document.body.firstChild;
};

export { replace, stringToDOM, ReplacePair };
