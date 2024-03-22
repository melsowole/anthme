import { router } from "./modules/router.ts";
import { readCookie, sendLogInRequest } from "./modules/api.ts";

readCookie()
sendLogInRequest('Lynx', '1234')

router.resolve();