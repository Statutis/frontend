import React, {useEffect} from 'react';
import Select from '../components/UI/Input/Select'
import Input from '../components/UI/Input/Input'
import GroupServiceCard from "../components/GroupServiceCard";
import useDocumentTitle from "../useDocumentTitle";
import {useState} from 'react';
import Switch from "../components/UI/Input/Switch";
import {getServiceTypes} from "../api/ServiceTypesRepository";
import {getTeams} from "../api/TeamRepository";
import {getPublicGroups} from "../api/GroupRepository";
import {getCheckTypes} from "../api/ServiceRepository";
import Group from "../api/Models/Group";
import ServiceType from "../api/Models/Service/ServiceType";
import Team from "../api/Models/Team";


const Search = function () {

    useDocumentTitle("Liste des groupes de services")

    const [groups, setGroups] = useState<Group[]>([])
    const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([])
    const [checkTypes, setCheckTypes] = useState<string[]>([])
    const [teams, setTeams] = useState<Team[]>([])

    const [searchValue, setSearchValue] = useState<string>("")
    const [selectTypeService, setSelectTypeService] = useState<ServiceType | undefined>(undefined)
    const [selectCheckType, setSelectCheckType] = useState<string | undefined>(undefined)
    const [selectTeam, setSelectTeam] = useState<Team | undefined>(undefined)
    const [displayPublicGroup, setDisplayPublicGroup] = useState<boolean>(false)
    const [displayOnlineGroup, setDisplayOnlineGroup] = useState<boolean>(true)

    useEffect(() => {
        getServiceTypes().then(setServiceTypes)
        getTeams().then(setTeams)
        getPublicGroups().then(setGroups)
        getCheckTypes().then(setCheckTypes)
    }, [])

    return <div className="fluid-content">
        <div className="grid4">
            <div className='mx-3'>
                <h2>Filtrer les résultats : </h2>
                <div className="form-group">
                    <label>Recherche :</label>
                    <Input placeholder="Titre de services ou mots clès" icon="search"
                           value={searchValue} onChange={setSearchValue}/>
                </div>
                <div className="form-group">
                    <label>Type du service :</label>
                    <Select options={serviceTypes} labelField="name" icon="style" value={selectTypeService}
                            onChange={setSelectTypeService} mapOptionToLabel={(option: ServiceType) => option.name}
                            mapOptionToValue={(option: ServiceType) => option.ref ?? ""}/>
                </div>
                <div className="form-group">
                    <label>Mode de vérification :</label>
                    <Select options={checkTypes} labelField="label" icon="task_alt" value={selectCheckType}
                            onChange={setSelectCheckType}/>
                </div>
                <div className="form-group">
                    <label>Equipe :</label>
                    <Select options={teams} labelField="name" icon="groups" value={selectTeam}
                            onChange={setSelectTeam} mapOptionToLabel={(option: Team) => option.name}
                            mapOptionToValue={(option: Team) => option.ref ?? ""}/>
                </div>
                <Switch value={displayOnlineGroup} onChange={setDisplayOnlineGroup}
                        label="Afficher les groupes en lignes"/>
                <Switch value={displayPublicGroup} onChange={setDisplayPublicGroup}
                        label="Masquer les groupes publics"/>
            </div>
            <div className="grid-cspan-3">
                <div id='service-group-list'>
                    {groups.filter(x => x.isInFilter(searchValue, selectTypeService, selectTeam, selectCheckType, displayPublicGroup, !displayOnlineGroup)).map(x =>
                        <GroupServiceCard key={x.ref} value={x}/>)}
                </div>
            </div>
        </div>
    </div>
}

export default Search;