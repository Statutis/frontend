import React, {createContext, useState} from "react";


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

const AppProvider = function ({children}: AppProviderProps) {
    const [title, setTitle] = useState<string>("")

    return <AppContext.Provider value={{pageTitle: title, setPageTitle: setTitle}}>{children}</AppContext.Provider>;
}

export default AppProvider;