import React, {createContext, useEffect, useState} from "react";
import {useAppDispatch} from "./Store/store";
import {refresh} from "./Store/AuthSlice";


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

export class UserRefreshEvent extends Event {
    token: string | undefined = undefined

    constructor(type: string, token: string | undefined, eventInitDict?: EventInit) {
        super(type, eventInitDict);
        this.token = token
    }
}

const AppProvider = function ({children}: AppProviderProps) {
    const [title, setTitle] = useState<string>("")
    const dispatcher = useAppDispatch()

    useEffect(() => {

        function handleClickOutside(event: UserRefreshEvent) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatcher(refresh(event.token))
        }

        document.addEventListener("onUserRefresh", handleClickOutside as EventListener);
        return () => {
            document.removeEventListener("onUserRefresh", handleClickOutside as EventListener);
        };

    }, [])


    return <AppContext.Provider value={{pageTitle: title, setPageTitle: setTitle}}>{children}</AppContext.Provider>;
}

export default AppProvider;