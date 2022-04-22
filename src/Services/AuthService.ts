import {login as apiLogin, refresh as apiRefresh} from "../api/AuthRepository";
import {getMe} from "../api/UserRepository";
import User from "../api/Models/User";
import {tokenLocalStorageKey} from "../Store/AuthSlice";

interface JWTToken {
    name: string;
    role: string;
    nbf: number;
    exp: number;
    iat: number;
}

interface AuthService {
    login: (username: string, password: string) => Promise<AuthUser | false>
    refresh: () => Promise<AuthUser | false>
    logout: () => void
    parseJwt: (toke: string) => JWTToken | undefined
}

export interface AuthUser {
    user: User;
    token: string;
}

const authService: AuthService = {
    login: (username, password) => {
        return apiLogin({username: username, password: password}).then(token => {
            if (token != false) {
                localStorage.setItem(tokenLocalStorageKey, token)

                return getMe().then(user => {
                    return {
                        user: user ?? new User(),
                        token: token,
                    }
                })
            }
            return false;
        })

    },
    refresh: () => {
        return apiRefresh().then(token => {
            if (token != false) {
                localStorage.setItem(tokenLocalStorageKey, token)

                return getMe().then(user => {
                    return {
                        user: user ?? new User(),
                        token: token,
                    }
                })

            }
            return false;
        })
    },
    logout: () => {
        localStorage.removeItem(tokenLocalStorageKey)
    },
    parseJwt: token => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return undefined;
        }
    }
}


export default authService;