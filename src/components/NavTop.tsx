import React from "react";
import LogoTitle from "../img/LogoTitle.png"
import '../assets/app/navtop.scss'
import {Link} from "react-router-dom";

function NavTop() {
    return <div className={"nav-top"} id={"nav-top"}>
        <Link className={"nav-logo"} to="/">
            <img src={LogoTitle} alt=""/>
        </Link>
        <div className={"nav-spacer"}/>
        <nav>
            <ul>
                <li><Link to={"/_ui"}>Accueil</Link></li>
                <li><a href="">A propos</a></li>
                <li><Link to="/login" className={"btn"}>Connection</Link></li>
            </ul>
        </nav>
    </div>
}

export default NavTop;