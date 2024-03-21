
const baseUrl = 'http://localhost:3000/users/';
const header = {
    "content-type": "application/json; charset=UTF-8"
};

export type User = {
    username: string,
    password: string,
    userImage: string
};

export async function getAllUsers():Promise<User[]>{
    const url = baseUrl;

    const res = await fetch(url);
    const users = await res.json();
    console.log(users);
    return users;

}

 export async function addUser(user: User): Promise<User[]> {
    const url = baseUrl;

    const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: header
    };

    try {
        const response = await fetch(url, options);
        const users: User[] = await response.json();
        return users;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

