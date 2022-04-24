import User from "./Models/User";
import axios from "axios";


export async function getMe(): Promise<User | undefined> {
    let response;
    try {
        response = await axios.get<User>("/api/users/me");
    } catch (e) {
        return undefined;
    }


    const u = new User();
    u.ref = response.data.ref
    u.avatarRef = response.data.avatarRef
    u.name = response.data.name
    u.firstname = response.data.firstname
    u.username = response.data.username
    u.email = response.data.email
    u.roles = response.data.roles
    u.teamsRef = response.data.teamsRef

    return u
}

export async function updateAvatar(file: File | undefined, user: User): Promise<void> {
    const formData = new FormData();
    if (file)
        formData.append("form", file);

    await axios.put(`api/users/avatar/${user.email}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export async function update(user: User): Promise<void> {
    await axios.patch(`api/users/${user.email}`, {
        "username": user.username,
        "name": user.name,
        "firstname": user.firstname,
    })
}
export async function updatePassword(user: User, password :string): Promise<void> {
    await axios.patch(`api/users/${user.email}`, {
        "password": password,
    })
}