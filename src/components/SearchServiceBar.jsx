import React from "react";
import PropTypes from "prop-types";
import "../assets/ui/custom/search_service_bar.scss"
import Select from "./UI/Input/Select";
import ServiceType from "../api/Models/Service/ServiceType";

function SearchServiceBar(
    {
        serviceTypes = [],
        selectServiceType = undefined,
        searchText = "",
        onChangeServiceType = () => {
        },
        onChangeSearchText = () => {
        }
    }
) {

    return <div className="search-service-bar">
        <span className={"material-icons"}>search</span>
        <input type="text" value={searchText} onChange={x => onChangeSearchText(x.target.value)}
               placeholder="Titre de services ou mots clefs"/>
        <div className="search-bar-input">
            <Select values={serviceTypes} value={selectServiceType} labelField={"name"} onChange={onChangeServiceType}/>
        </div>

        <button className={"btn btn-orange btn-small"}><span className={"material-icons"}>search</span></button>
    </div>
}

export default SearchServiceBar;

SearchServiceBar.propTypes = {
    serviceTypes: PropTypes.arrayOf(PropTypes.instanceOf(ServiceType)),
    searchText: PropTypes.string,
    selectServiceType: PropTypes.instanceOf(ServiceType),
    onChangeServiceType: PropTypes.func,
    onChangeSearchText: PropTypes.func,
}