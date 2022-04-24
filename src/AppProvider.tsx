import React, {createContext, useEffect, useState} from "react";
import {AppDispatch, useAppDispatch, useAppSelector} from "./Store/store";
import {logout, refresh} from "./Store/AuthSlice";
import User from "./api/Models/User";
import {UserServiceEvent, UserUpdateEvent} from "./Services/UserService";


interface AppContextInterface {
    pageTitle: string;
    setPageTitle: ((newValue: string) => void);
}

export const AppContext = createContext<AppContextInterface>({
    pageTitle: "Pas de titre",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setPageTitle: () => {
    },
});

interface AppProviderProps {
    children: JSX.Element
}

export class UserAuthEvent extends Event {
    token: string | undefined = undefined
    user: User | undefined = undefined

    constructor(type: string, token: string | undefined, user: User | undefined, eventInitDict?: EventInit) {
        super(type, eventInitDict);
        this.token = token
        this.user = user
    }
}

const AppProvider = function ({children}: AppProviderProps) {
    const [title, setTitle] = useState<string>("")

    const dispatcher: AppDispatch = useAppDispatch()
    const user = useAppSelector(state => state.auth.user)
    const token = useAppSelector(state => state.auth.token)

    useEffect(() => {

        function handleUserRefresh(event: UserAuthEvent) {
            if (event.user && event.token)
                dispatcher(refresh({user: event.user, token: event.token}))
        }

        function handleUserUpdate(event: UserUpdateEvent) {
            if (user?.ref == event.user.ref)
                dispatcher(refresh({user: event.user, token: token ? token : ""}))
        }

        function handleUserLogout() {
            dispatcher(logout())
        }

        document.addEventListener("onUserRefresh", handleUserRefresh as EventListener);
        document.addEventListener("onUserLogout", handleUserLogout as EventListener);
        document.addEventListener(UserServiceEvent.UpdateUser, handleUserUpdate as EventListener);
        return () => {
            document.removeEventListener("onUserRefresh", handleUserRefresh as EventListener);
            document.removeEventListener("onUserLogout", handleUserLogout as EventListener);
            document.removeEventListener(UserServiceEvent.UpdateUser, handleUserUpdate as EventListener);
        };

    }, [token, user])


    return <AppContext.Provider value={{pageTitle: title, setPageTitle: setTitle}}>{children}</AppContext.Provider>;
}

export default AppProvider;