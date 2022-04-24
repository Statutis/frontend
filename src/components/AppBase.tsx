import React, {useContext} from "react";
import HeaderLeft from "../img/base_left.svg";
import HeaderRight from "../img/base_right.svg";
import {AppContext} from "../AppProvider";
import PropTypes from "prop-types";

interface AppBaseProps {
    children: JSX.Element
}


const AppBase = function ({children}: AppBaseProps) {

    const {pageTitle} = useContext(AppContext);

    return <>
        <div className={"app-header"}>
            <img src={HeaderLeft} alt="Logo Gauche"/>
            <div>
                <div>
                    <h1>{pageTitle}</h1>
                    <hr/>
                </div>
            </div>
            <img src={HeaderRight} alt="Logo Droit"/>
        </div>
        {children}
    </>
}

export default AppBase;

AppBase.propTypes = {
    children: PropTypes.node.isRequired,
};