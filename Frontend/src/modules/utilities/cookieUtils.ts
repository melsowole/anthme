// Om vi bestämmer oss för att skicka flera cookies
function getCookie(cookieKey: string): string {
  const cookie: string = decodeURIComponent(document.cookie);
  const cookieValue: string = cookie.split(`${cookieKey}=`)[1];
  const matchedKey: string = cookieValue.split(";")[0];

  return matchedKey;
}

function filterCookieValue(key: string, cookieKey: string): string {
  const cookieValue = getCookie(cookieKey);
  const parts: string[] = cookieValue.split(`--`);

  const filteredKeyValue: string[] = parts.filter((element) => {
    const keyValue: string[] = element.split(":");
    return keyValue.length >= 2 && keyValue[0].trim() === key;
  });

  let matchedValue: string = "";
  if (filteredKeyValue.length > 0) {
    const indexOfSeparator = filteredKeyValue[0].indexOf(":");
    matchedValue = filteredKeyValue[0].slice(indexOfSeparator + 1);
  }

  return matchedValue;
}

function deleteCookie(cookieKey: string): void {
  document.cookie = `${cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export { getCookie, filterCookieValue, deleteCookie };
