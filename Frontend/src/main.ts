import {router, setupRouter} from "./modules/router.ts"

setupRouter()
.then(() => {
    router.resolve();
})
.catch(error => {
    console.log(error);
})

// import Navigo from "navigo";
// import displayPostPage from "./pages/displayPostPage.ts";
// import { displayLandingPage } from "./pages/displayLandingPage.ts";
// import { displayHomePage } from "./components/HomePage.ts";
// import { readCookie } from "./modules/api.ts";


// function setupRoutes(response: boolean): void {
//     if(!response) {
//         router.on('*', displayLandingPage)
//     }
//     else {
//         router.on('/', () => {
//             fetch('http://localhost:3000/posts/')
//             .then(res => res.json())
//             .then(displayHomePage)
//         })
//         router.on('/post', displayPostPage)
//     }
//     router.resolve();
// }
// readCookie().then(setupRoutes);


// readCookie().then(response => {
//     if(!response) {
//         router.on('*', displayLandingPage)
//     }
//     else {
//         router.on('/', () => {
//             fetch('http://localhost:3000/posts/')
//             .then(res => res.json())
//             .then(displayHomePage)
//         })
//         router.on('/post', displayPostPage)
//     }
//     router.resolve()
// })


