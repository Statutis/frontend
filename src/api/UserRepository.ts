import User from "./Models/User";
import axios from "axios";


const serialize = (data: User): User => {
    const u = new User();
    u.ref = data.ref
    u.avatarRef = data.avatarRef
    u.name = data.name
    u.firstname = data.firstname
    u.username = data.username
    u.email = data.email
    u.roles = data.roles
    u.teamsRef = data.teamsRef
    return u
}

export async function getMe(): Promise<User | undefined> {
    let response;
    try {
        response = await axios.get<User>("/api/users/me");
    } catch (e) {
        return undefined;
    }

    return serialize(response.data)
}

export async function getUserByRef(ref: string): Promise<User> {
    const response = await axios.get<User>(ref);
    return serialize(response.data);
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

export async function updatePassword(user: User, password: string): Promise<void> {
    await axios.patch(`api/users/${user.email}`, {
        "password": password,
    })
}