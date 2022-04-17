import React from 'react';
import '../assets/app/app.scss'
import useDocumentTitle from "../useDocumentTitle";
import GroupServiceCard from "../components/GroupServiceCard";
import ProgressBar from "../components/ProgressBar";
import Input from "../components/UI/Input/Input";
import Select from "../components/UI/Input/Select";
import Switch from "../components/UI/Input/Switch";

const UI = function() {

    useDocumentTitle("Elements Graphiques")

    const colors = ["primary", "secondary", "green", "red", "grey", "dark-grey", "orange"];
    let serviceTypes = [{id: 1, label: "Site Web"}, {id: 2, label: "Reverse Proxy"}];

    return <div className={"content"}>

        <div className="grid2">
            <div>
                <div className="h1 mb-1">Titre de premier niveau</div>
                <div className="h2 mb-1">Titre de second niveau</div>
                <div className="h3 mb-1">Titre de troisième niveau</div>
                <div className="h4 mb-1">Titre de quatrième niveau</div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam consequatur dolor est ex,
                    excepturi
                    explicabo iusto libero minus nostrum obcaecati omnis perferendis provident reprehenderit sapiente,
                    soluta unde
                    veniam voluptates?
                </p>
            </div>
            <div>
                <div className="hero-title">Titre .hero-title</div>
                <p className="hero-text">.hero-text ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque
                    dolorem eligendi esse et porro repellendus? Autem consectetur deserunt dolor laborum, tenetur unde!
                    Facilis hic ipsa, iste itaque quam quidem.</p>

                <div className="section-title mt4">Titre de section .section-title</div>
                <div>
                    <span className="text-danger">Texte d'alerte .text-danger</span>
                    <span className="text-muted">Texte d'alerte .text-muted</span>
                </div>
                <hr/>
            </div>
        </div>
        <div>
            <div className="h1 mt-5">Couleurs</div>
            <div className="hstack">
                {colors.map(x => {
                    return <div className="m-2" key={x}>
                        <span style={{fontSize: "0.8em"}}>{x}</span>
                        <div style={{width: 70 + "px", height: 70 + "px", background: "var(--color-" + x + ")"}}/>
                    </div>
                })}
            </div>
        </div>

        <div>
            <h2 className="h1 mt-5">Boutons</h2>
            <div>
                {colors.map(x => {
                    return <a href="#" key={x} className={"m-2 btn btn-" + x}>.app-btn app-btn-{x}</a>
                })}
            </div>
        </div>

        <div>
            <h2 className="h1 mt-5">Carte</h2>
            <div className="hstack">
                <div className="m-4">
                    <small className="text-muted">.card</small>
                    <div className="card" style={{width: "400px"}}>
                        <div className="card-body">
                            <h2>Titre de la carte</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad blanditiis consectetur cum
                                debitis facilis fugiat illo impedit maiores sequi soluta sunt tempora vel, veritatis.
                                Aperiam nesciunt quaerat quam quas quasi.</p>
                        </div>
                    </div>
                </div>
                <div className={"m-4"}>
                    <small className="text-muted">Carte pour les groupes de services</small>
                    <GroupServiceCard value={{
                        name: "Titre du groupe de service",
                        description: "Lorem ipsum dolor sit amet, consetetur sadipscing ..",
                    }}/>
                </div>
            </div>
        </div>
        <div>
            <h2 className="h1 mt-5">Barres de progression</h2>
            <div className="vstack">
                {colors.map(x => {
                    return <ProgressBar key={x} className={"progress-" + x} progress={75}/>
                })}
            </div>
        </div>
        <div>
            <h2 className="h1 mt-5">Formulaire</h2>
            <h3 className="h3 mt-5">Input</h3>
            <div className={"htsack"}>
                <div className={"form-group"}>
                    <label htmlFor="inputtext">Mon input : </label>
                    <Input placeholder={"Saisir une valeur"} id="inputtext"/>
                </div>
            </div>
            <h3 className="h3 mt-5">Select : </h3>
            <div className={"htsack"}>
                <div className={"form-group"}>
                    <label htmlFor="text">Mon Select : </label>
                    <Select placeholder={"Choisir une valeur"} id="select-text" values={serviceTypes}/>
                </div>
            </div>
            <h3 className="h3 mt-5">Switch</h3>
            <div className="hstack">
                {colors.map(x => {
                    return <Switch key={x} label={".app-switch .app-switch-" + x} className={"app-switch-" + x}/>
                })}
            </div>
        </div>


    </div>
}

export default UI;