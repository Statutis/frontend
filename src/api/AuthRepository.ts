import axios from "axios";

interface AuthenticationForm {
    "username": string
    "password": string
}


interface LoginModel {
    "msg": string;
    "login": string;
    "refresh": string;
    "register": string;
    "token": string;
    "status": boolean
}

interface RegistrationForm {
    "username": string;
    "password": string;
    "firstname": string;
    "name": string;
    "email": string;
}

export async function login(credential: AuthenticationForm): Promise<string | false> {
    const response = await axios.post<LoginModel>("/api/auth/login", credential)
    if (response.status != 200)
        return false

    return response.data.token
}

export async function refresh(): Promise<string | false> {
    const response = await axios.post<LoginModel>("/api/auth/refresh")
    if (response.status != 200)
        return false

    return response.data.token
}

export async function register(data : RegistrationForm): Promise<boolean> {
    const response = await axios.post<LoginModel>("/api/auth/register", data)
    return response.status == 200;


}