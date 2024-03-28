import{ User } from "./fetchUsers.js"

export function validateLogIn(users: User[], username: string, password: string): boolean {
    for (const user of users) {
        if (user.username === username && user.password === password) {
            return true;
        }
    }
   
    return false;
}