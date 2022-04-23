import React from "react";
import LogoTitle from "../img/LogoTitle.png"
import '../assets/app/navtop.scss'
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../Store/store";
import User from "../api/Models/User";
import AuthService from "../Services/AuthService";
import {logout} from "../Store/AuthSlice";
import ImageLoader from "./UI/ImageLoader";
import UserAvatar from './../img/user_avatar.png';

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
            <li className="profil-section">
                { user.avatarRef ? <ImageLoader src={user.avatarRef} alt={user.email}/> : <img src={UserAvatar} alt={user.email}/>}
                <span>{user.email}</span>
            </li>
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
