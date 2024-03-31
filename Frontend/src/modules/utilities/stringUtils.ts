// For text edited content
function htmlEntitiesToString(string:string): string {
    return string.replace(/\&lt;/g, "<").replace(/\&gt;/g, ">").replace(/\&#x2F;/g, "/").replace(/\&quot;/g, `"`);
}

export {htmlEntitiesToString}