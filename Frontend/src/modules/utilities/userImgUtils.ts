const bananaUrlObj = new URL("../../img/userImgBanana.png", import.meta.url);
const pizzaUrlObj = new URL("../../img/userImgPizza.png", import.meta.url);
const donutUrlObj = new URL("../../img/userImgDonut.png", import.meta.url);

const pizza = pizzaUrlObj.href;
const banana = bananaUrlObj.href;
const donut = donutUrlObj.href

export {pizza, banana, donut}