import React from "react";
import LogoTitleImage from '../img/LogoTitle.png'
import FooterCornerImage from '../img/TrafficLight_Perdu_Dans_la_nature.png'
import {Link} from "react-router-dom";

const Footer = function () {
    return <footer>
        <img className={"footer-right-corner"} src={FooterCornerImage} />
        <div className={"footer-container"}>
            <div>
                <img src={LogoTitleImage} alt="Logo Image avec titre"/>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                    et ea rebum.
                </p>
            </div>
            <div className={"footer-separator"}/>
            <div>
                <ul>
                    <li><a href="">Accueil</a></li>
                    <li><a href="">À propos</a></li>
                    <li><a href="">Connexion</a></li>
                    <li><Link to="/legal/notice">Mentions Légales</Link></li>
                    <li><a href="">Inscription</a></li>
                    <li><a href="">Liste des équipes</a></li>
                    <li><a href="">Dépôts</a></li>
                    <li><a href="">Support</a></li>
                </ul>
            </div>
            <div className={"footer-separator"}/>
            <div>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                    et
                    ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
                <div className={"footer-list-icon"}>
                    <a href=""><span className={"material-icons"}>credit_card</span></a>
                    <a href=""><span className={"material-icons"}>credit_card</span></a>
                    <a href=""><span className={"material-icons"}>credit_card</span></a>
                    <a href=""><span className={"material-icons"}>credit_card</span></a>
                </div>
            </div>
        </div>
    </footer>
}

export default Footer;