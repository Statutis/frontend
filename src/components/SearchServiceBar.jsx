import {useState} from "react";
import "./../assets/ui/components/custom/search_service_bar.scss"
import Select from "./UI/Input/Select";

function SearchServiceBar(props) {

    let serviceTypes = [{id: 1, label: "Site Web"}, {id: 2, label: "Reverse Proxy"}];

    const [searchText, setSearchText] = useState("")
    const [selectServiceType, setSelectServiceType] = useState(undefined)

    return <div className="search-service-bar">
        <span className={"material-icons"}>search</span>
        <input type="text" value={searchText} onChange={x => setSearchText(x.target.value)}
               placeholder="Titre de services ou mots clefs"/>
        {/*<span className={"material-icons"}>style</span>*/}
        {/*<select value={selectServiceType?.id}*/}
        {/*        onChange={x => setSelectServiceType(serviceTypes.find(y => y.id == x.target.value))}>*/}
        {/*    <option value={""}></option>*/}
        {/*    {serviceTypes.map(x => {*/}
        {/*        return <option value={x.id} key={x.id}>{x.label}</option>*/}
        {/*    })};*/}
        {/*</select>*/}
        <div className="search-bar-input">
            <Select values={serviceTypes} />
        </div>

        <button className={"btn btn-orange btn-small"}><span className={"material-icons"}>search</span></button>
    </div>
}

export default SearchServiceBar;