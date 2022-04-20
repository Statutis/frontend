import React, {useEffect} from 'react';
import Select from './../components/UI/Input/Select'
import Input from './../components/UI/Input/Input'
import GroupServiceCard from "./../components/GroupServiceCard";
import useDocumentTitle from "../useDocumentTitle";
import {useState} from 'react';
import Switch from "../components/UI/Input/Switch";
import {getServiceTypes} from "../api/ServiceTypesRepository";
import {getTeams} from "../api/TeamRepository";
import {getPublicGroups} from "../api/GroupRepository";
import {getCheckTypes} from "../api/ServiceRepository";

const Search = function () {

    useDocumentTitle("Liste des groupes de services")

    const [groups, setGroups] = useState([])
    const [serviceTypes, setServiceTypes] = useState([])
    const [checkTypes, setCheckTypes] = useState([])
    const [teams, setTeams] = useState([])

    const [searchValue, setSearchValue] = useState("")
    const [selectTypeService, setSelectTypeService] = useState(undefined)
    const [selectCheckType, setSelectCheckType] = useState(undefined)
    const [selectTeam, setSelectTeam] = useState(undefined)
    const [displayPublicGroup, setDisplayPublicGroup] = useState(false)
    const [displayOnlineGroup, setDisplayOnlineGroup] = useState(true)

    useEffect(() => {
        getServiceTypes().then(setServiceTypes)
        getTeams().then(setTeams)
        getPublicGroups().then(setGroups)
        getCheckTypes().then(x => {
            let res = x.map(y => {
                return {
                    ref: y,
                    label: y,
                }
            })
            setCheckTypes(res)
        })
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
                    <Select values={serviceTypes} labelField="name" icon="style" value={selectTypeService}
                            onChange={setSelectTypeService}/>
                </div>
                <div className="form-group">
                    <label>Mode de vérification :</label>
                    <Select values={checkTypes} labelField="label" icon="task_alt" value={selectCheckType}
                            onChange={setSelectCheckType}/>
                </div>
                <div className="form-group">
                    <label>Equipe :</label>
                    <Select values={teams} labelField="name" icon="groups" value={selectTeam}
                            onChange={setSelectTeam}/>
                </div>
                <Switch value={displayOnlineGroup} onChange={setDisplayOnlineGroup}
                        label="Afficher les groupes en lignes"/>
                <Switch value={displayPublicGroup} onChange={setDisplayPublicGroup}
                        label="Masquer les groupes publics"/>
            </div>
            <div className="grid-cspan-3">
                <div id='service-group-list'>
                    {groups.filter(x => x.isInFilter(searchValue, selectTypeService, selectTeam?.ref, selectCheckType?.name, displayPublicGroup, !displayOnlineGroup)).map(x =>
                        <GroupServiceCard key={x.ref} value={x}/>)}
                </div>
            </div>
        </div>
    </div>
}

export default Search;