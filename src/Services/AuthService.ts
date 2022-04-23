import {login as apiLogin, refresh as apiRefresh} from "../api/AuthRepository";
import {getMe} from "../api/UserRepository";
import User from "../api/Models/User";
import {tokenLocalStorageKey} from "../Store/AuthSlice";
import {UserAuthEvent} from "../AppProvider";

interface JWTToken {
    name: string;
    role: string;
    nbf: number;
    exp: number;
    iat: number;
}

interface AuthServiceInterface {
    login(username: string, password: string): Promise<AuthUser | false>

    refresh(): Promise<AuthUser | false>

    logout(): void

    parseJwt(toke: string): JWTToken | undefined,

    fixToken(token: string): Promise<string | false>
}

export interface AuthUser {
    user: User;
    token: string;
}

class AuthService implements AuthServiceInterface {

    currentRefresh = false

    async login(username: string, password: string): Promise<AuthUser | false> {
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

    }

    async refresh(): Promise<AuthUser | false> {
        return apiRefresh().then(async token => {
            if (token != false) {
                localStorage.setItem(tokenLocalStorageKey, token)

                const me = await getMe();
                if (!me)
                    return false;

                document.dispatchEvent(new UserAuthEvent("onUserRefresh", token, me))

                return {
                    user: me,
                    token: token,
                }

            }
            return false;
        })
    }

    logout(): void {
        localStorage.removeItem(tokenLocalStorageKey)
        document.dispatchEvent(new Event("onUserLogout"))
    }

    parseJwt(token: string): JWTToken | undefined {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return undefined;
        }
    }

    async fixToken(token: string): Promise<string | false> {
        if (this.currentRefresh) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            token = localStorage.getItem(tokenLocalStorageKey) ?? ""
        }
        const expTimeStamp: number | undefined = this.parseJwt(token)?.exp ?? undefined;
        if (!expTimeStamp)
            return token
        const exp = new Date(expTimeStamp * 1000 )
        // const diff = (exp.getTime() - (new Date()).getTime())
        const diff = (exp.getTime() - (new Date()).getTime())
        if (diff < 0) { // Si dépasser on lance la déconnexion
            await this.logout()
            return false
        } else if (diff / 1000 / 60 < 15) {
            this.currentRefresh = true;
            const refresh = await this.refresh()
            this.currentRefresh = false;
            if (refresh)
                return refresh.token

        }
        return token
    }
}

const authService: AuthServiceInterface = new AuthService();

export default authService;