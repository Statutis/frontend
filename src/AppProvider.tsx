import React, {createContext, useEffect, useState} from "react";
import {AppDispatch, useAppDispatch} from "./Store/store";
import {logout, refresh} from "./Store/AuthSlice";
import User from "./api/Models/User";


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

    useEffect(() => {

        function handleUserRefresh(event: UserAuthEvent) {
            if (event.user && event.token)
                dispatcher(refresh({user: event.user, token: event.token}))
        }

        function handleUserLogout() {
            dispatcher(logout())
        }

        document.addEventListener("onUserRefresh", handleUserRefresh as EventListener);
        document.addEventListener("onUserLogout", handleUserLogout as EventListener);
        return () => {
            document.removeEventListener("onUserRefresh", handleUserRefresh as EventListener);
            document.removeEventListener("onUserLogout", handleUserLogout as EventListener);
        };

    }, [])


    return <AppContext.Provider value={{pageTitle: title, setPageTitle: setTitle}}>{children}</AppContext.Provider>;
}

export default AppProvider;