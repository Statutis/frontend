import React from "react";
import LogoTitleImage from '../img/LogoTitle.png'
import FooterCornerImage from '../img/TrafficLight_Perdu_Dans_la_nature.png'
import {Link} from "react-router-dom";
import GithubIcon from './../img/brand/github.png'
import TwitterIcon from './../img/brand/twitter.png'
import SilvainEuIcon from './../img/brand/silvain.eu.png'

const Footer = function () {
    return <>
        <div className={"hstack stack-center mx-8"}>
            <button id="btn-top-window" onClick={() => window.scrollTo(0, 0)}>
                <span className={"material-icons"}>expand_less</span>
            </button>
        </div>
        <footer>
            <img className={"footer-right-corner"} src={FooterCornerImage} alt={"Statutis logo"}/>
            <div className={"footer-container"}>
                <div>
                    <img src={LogoTitleImage} alt="Logo Image avec titre"/>
                    <p>
                        L'appplication Statutis a pour objectif de vérifier la disponibilité de vos services (exemple :
                        Site web), ainsi que si ce dernier fonctionne correctement. Pour cela, ce logiciel se base sur
                        différent modes de vérifications comme des requêtes HTTP ou DNS, et vous permet d'en contrôler le
                        résultat (dans une certaine mesure)
                    </p>
                </div>
                <div className={"footer-separator"}/>
                <div>
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/login">Connexion</Link></li>
                        <li><Link to="/legal/notice">Mentions Légales</Link></li>
                        <li><Link to="/register">Inscription</Link></li>
                        <li><Link to="/teams">Liste des équipes</Link></li>
                        <li><a href="https://github.com/Statutis">Dépôts</a></li>
                        <li><a href="mailto:contact@silvain.eu">Support</a></li>
                    </ul>
                </div>
                <div className={"footer-separator"}/>
                <div>
                    <p>
                        Ce projet a été développé par <a href="https://github.com/miithrandiir">Simon HEBAN</a> & <a
                        href="https://github.com/silvainlud">Ludwig SILVAIN</a> dans le cadre du module d'initiation
                        au Web Services lors de la première année de master WedSci de l'Université du Littoral Côte
                        d'Opale.
                    </p>
                    <div className={"footer-list-icon"}>
                        <a target="_blank" href="https://github.com/Statutis" rel="noreferrer"><img src={GithubIcon}
                                                                                                    alt="github"/></a>
                        <a target="_blank" href="https://twitter.com" rel="noreferrer"><img src={TwitterIcon}
                                                                                            alt="twitter"/></a>
                        <a target="_blank" href="https://silvain.eu" rel="noreferrer"><img src={SilvainEuIcon}
                                                                                           alt="Silvain.eu"/></a>
                        <a target="_blank" href="https://paypal.com" rel="noreferrer"><span
                            className={"material-icons"}>credit_card</span></a>
                    </div>
                </div>
            </div>
        </footer>
    </>
}

export default Footer;
