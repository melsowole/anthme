import {router, setupRouter} from "./modules/router.ts"

setupRouter()
.then(() => {
    router.resolve();
})
.catch(error => {
    console.log(error);
})