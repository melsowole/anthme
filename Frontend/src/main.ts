import {router, setupRouter} from "./modules/router.js"

setupRouter()
.then(() => {
    router.resolve();
})
.catch(error => {
    console.log(error);
})