import Select from './../components/UI/Input/Select'
import Input from './../components/UI/Input/Input'
import GroupServiceCard from "./../components/GroupServiceCard";
import useDocumentTitle from "../useDocumentTitle";
import { useState } from 'react';

const Search = function(){

    useDocumentTitle("Liste des groupes de services")

    let serviceTypes = [{id: 1, label: "Site Web"}, {id: 2, label: "Reverse Proxy"}];

    const [searchValue, setSearchValue] = useState("")
    const [selectTypeService, setSelectTypeService] = useState(null)

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
                        <Select values={serviceTypes} icon="style"/>
                    </div>
                    <div className="form-group">
                        <label>Mode de vérification :</label>
                        <Select values={serviceTypes} icon="task_alt"/>
                    </div>
                    <div className="form-group">
                        <label>Equipe :</label>
                        <Select values={serviceTypes} icon="groups"/>
                    </div>
                </div>
                <div className="grid-cspan-3">
                    <div id='service-group-list'>
                        {Array(9).fill(null).map((el, i) => {
                            let v = {
                                id: i,
                                name: "ClusterWeb",
                                description: "Lorem ipsum dolor sit amet, consetetur sadipscing ..",
                                countService: 9,
                                countServiceOnline: i + 1,
                                lastCheck: "5 min"
                            };
                            return <GroupServiceCard key={i} value={v}/>
                        })}
                    </div>
                </div>
            </div>
    </div>
}

export default Search;