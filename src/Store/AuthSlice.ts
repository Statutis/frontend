import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User from "../api/Models/User";
import {AuthUser} from "../Services/AuthService";
import axios from "axios";

export const tokenLocalStorageKey = "tokens"

interface AuthState {
    token: string | false;
    user: User | undefined;
}

const initialState = async (): Promise<AuthState> => {

    let token = localStorage.getItem(tokenLocalStorageKey) ?? false;
    let user = undefined;
    if (token)
        try {
            const response = await axios.get<User>(import.meta.env.APP_API_URL + "/api/users/me", {
                headers: {Authorization: "Bearer " + token}
            });


            user = new User();
            user.ref = response.data.ref
            user.avatarRef = response.data.avatarRef
            user.username = response.data.username
            user.email = response.data.email
            user.roles = response.data.roles
            user.teamsRef = response.data.teamsRef
        } catch (e) {
            token = false;
            user = undefined;
        }


    return {
        token: token,
        user: user
    }
}


export const AuthSlice = createSlice({
    name: "Auth",
    initialState: await initialState(),
    reducers: {
        login: (state, action: PayloadAction<AuthUser>) => {
            state.token = action.payload.token
            state.user = action.payload.user
        },
        refresh: (state, action: PayloadAction<AuthUser>) => {
            state.token = action.payload.token
            state.user = action.payload.user
        },
        logout: (state) => {
            state.token = false
            state.user = undefined
        },
    }
})

export const {login, refresh, logout} = AuthSlice.actions

export default AuthSlice.reducer