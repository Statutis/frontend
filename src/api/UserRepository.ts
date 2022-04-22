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
    u.username = response.data.username
    u.email = response.data.email
    u.roles = response.data.roles
    u.teamsRef = response.data.teamsRef

    return response.data
}