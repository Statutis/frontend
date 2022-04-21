import React from "react";
import LogoTitle from "../img/LogoTitle.png"
import '../assets/app/navtop.scss'
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../Store/store";
import User from "../api/Models/User";
import AuthService from "../Services/AuthService";
import {logout} from "../Store/AuthSlice";

function NavTop() {

    const user = useAppSelector(state => state.auth.user)
    const dispatcher = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        AuthService.logout()
        dispatcher(logout())
        navigate("/")
    }


    const connectionSection = (user: User | undefined) => {
        if (!user)
            return <li><Link to="/login" className={"btn"}>Connexion</Link></li>
        return <>
            <li><Link to="/login" title={user.email}>Mon profil</Link></li>
            <li>
                <button className={"btn btn-secondary"} onClick={handleLogout}>Déconnection</button>
            </li>
        </>
    }


    return <div className={"nav-top"} id={"nav-top"}>
        <Link className={"nav-logo"} to="/">
            <img src={LogoTitle} alt=""/>
        </Link>
        <div className={"nav-spacer"}/>
        <nav>
            <ul>
                <li><Link to={"/_ui"}>Accueil</Link></li>
                <li><a href="">A propos</a></li>
                {connectionSection(user)}
            </ul>
        </nav>
    </div>
}

export default NavTop;
