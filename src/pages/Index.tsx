import React, {useEffect, useState} from 'react';
import NavTop from "../components/NavTop";
import '../assets/app/app.scss'
import '../assets/app/pages/main.scss'
import HeaderRight from './../img/index_right.svg'
import HeaderLeft from './../img/index_left.svg'
import DoneImg from '../img/done.png'
import UnknownImg from '../img/unknown.png'
import TimesImg from '../img/times.png'
import SearchServiceBar from "../components/SearchServiceBar";
import Footer from "../components/Footer";
import GroupServiceCard from "../components/GroupServiceCard";
import useDocumentTitle from "../useDocumentTitle";
import {getServiceTypes} from "../api/ServiceTypesRepository";
import {getMainState, MainState} from "../api/ServiceRepository";
import {getPublicGroups} from "../api/GroupRepository";
import Group from "../api/Models/Group";
import ServiceType from "../api/Models/Service/ServiceType";


function Index() {

    const [mainState, setMainState] = useState<MainState | undefined>()

    const [groups, setGroups] = useState<Group[]>([])
    const [servicesTypes, setServiceTypes] = useState<ServiceType[]>([])

    const [selectServiceType, setSelectServiceType] = useState<ServiceType | undefined>(undefined)
    const [searchService, setSearchService] = useState<string>("")
    useDocumentTitle("Page d'accueil")


    useEffect(() => {
        getServiceTypes().then(setServiceTypes)
        getMainState().then(setMainState)
        getPublicGroups().then(setGroups)
    }, [])

    const HeaderTitle = function HeaderTitle() {
        if (!mainState)
            return <div className={"index-title"}>
                <img src={UnknownImg} alt="Unknonw"/>
                <div>
                    <h1>Etats des services inconnues</h1>
                    <p className={"text-muted"}>Dernière vérification : en cours</p>
                </div>
            </div>

        // const verificationTime = displayDelay(mainState.lastUpdate, new Date());
        const verificationTime = "jamai";

        switch (mainState.state) {
            case "Online":
                return <div className={"index-title"}>
                    <img src={DoneImg} alt="Unknonw"/>
                    <div>
                        <h1>TOUS LES SERVICES SONT OPÉRATIONNELS</h1>
                        <p className={"text-muted"}>Dernière vérification :{verificationTime}</p>
                    </div>
                </div>
            case "Error":
                return <div className={"index-title"}>
                    <img src={TimesImg} alt="Unknonw"/>
                    <div>
                        <h1>TOUS LES SERVICES NE SONT PAS OPÉRATIONNELS</h1>
                        <p className={"text-muted"}>Dernière vérification :{verificationTime}</p>
                    </div>
                </div>
            default:
                return <div className={"index-title"}>
                    <img src={UnknownImg} alt="Unknonw"/>
                    <div>
                        <h1>Etats des services inconnues</h1>
                        <p className={"text-muted"}>Dernière vérification :{verificationTime}</p>
                    </div>
                </div>
        }

    }

    return <>
        <NavTop/>
        <div className={"app-header"}>
            <img src={HeaderLeft} alt="Logo Gauche"/>
            <div>
                {HeaderTitle()}
            </div>
            <img src={HeaderRight} alt="Logo Droit"/>
        </div>
        <div className={"fluid-content"}>
            <SearchServiceBar serviceTypes={servicesTypes} searchText={searchService}
                              selectServiceType={selectServiceType}
                              onChangeSearchText={setSearchService} onChangeServiceType={setSelectServiceType}

            />
            <div id="service-group-list" className="mt-5">
                {groups.filter(x => x.isInFilter(searchService, selectServiceType)).map(x => {
                    return <GroupServiceCard key={x.ref} value={x}/>
                })}
            </div>
        </div>
        <Footer/>
    </>
}

export default Index;