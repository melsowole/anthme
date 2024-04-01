import "quill/dist/quill.snow.css";
import {router, setupRouter} from "./router.js"

setupRouter()
.then(() => {
    router.resolve();
})
.catch(error => {
    console.log(error);
})