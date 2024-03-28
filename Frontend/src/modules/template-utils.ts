const stringToDOM = (htmlString: string):any =>{
     const parser = new DOMParser();
     const document = parser.parseFromString(htmlString, "text/html");
     return document.body.firstChild;
}

export{stringToDOM}