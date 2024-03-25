// Om vi bestämmer oss för att skicka flera cookies
function getCookie(cookieKey:string):string {
    const cookie:string = decodeURIComponent(document.cookie);
    const cookieValue:string = cookie.split(`${cookieKey}=`)[1];
    const matchedKey: string = cookieValue.split(';')[0];

    return matchedKey;
    
}

function filterCookieValue(key:string, cookieKey:string): string {
    const cookieValue = getCookie(cookieKey)
    const parts:string[] = cookieValue.split(`--`);

    const filteredKeyValue:string[] = parts.filter(element => {
        const keyValue:string[] = element.split(':'); 
        return keyValue.length === 2 && keyValue[0].trim() === key;
    })
    
    let matchedValue: string = '';
    if(filteredKeyValue.length > 0) {
        matchedValue = filteredKeyValue[0].split(':')[1].trim()
    }
    return matchedValue;
}

export {getCookie, filterCookieValue}