import {Outlet} from "react-router-dom";
import NavTop from "./NavTop";
import HeaderLeft from "../img/base_left.svg";
import HeaderRight from "../img/base_right.svg";
import Footer from "./Footer";
import {useEffect, useState} from "react";


const AppBase = function (props) {

    const [title, setTitle] = useState("")

    useEffect(() => {
        setTitle(document.title)
    }, [document.title])

    return <>
        <NavTop/>
        <div className={"app-header"}>
            <img src={HeaderLeft} alt="Logo Gauche"/>
            <div>
                <div>
                    <h1>{title}</h1>
                    <hr/>
                </div>
            </div>
            <img src={HeaderRight} alt="Logo Droit"/>
        </div>
        <div className={"content"}>
            <Outlet/>
        </div>
        <Footer/>
    </>
}

export default AppBase;