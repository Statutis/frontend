import React, {createContext, useState} from "react";
import PropTypes from "prop-types";

export const AppContext = createContext({
    pageTitle: "Pas de titre",
    setPageTitle: () => {
    },
});

const AppProvider = function ({children}) {
    const [title, setTitle] = useState("")

    return <AppContext.Provider value={{pageTitle: title, setPageTitle: setTitle}}>{children}</AppContext.Provider>;
}

export default AppProvider

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};