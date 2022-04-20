import React from "react";
import PropTypes from "prop-types";
import "../assets/ui/custom/search_service_bar.scss"
import Select from "./UI/Input/Select";
import ServiceType from "../api/Models/Service/ServiceType";

interface SearchServiceBarProps {
    serviceTypes: ServiceType[];
    selectServiceType: ServiceType | undefined;
    searchText: string | undefined;
    onChangeServiceType?: ((value: ServiceType|undefined) => void);
    onChangeSearchText?: ((value: string) => void);
}

function SearchServiceBar(
    {
        serviceTypes = [],
        selectServiceType = undefined,
        searchText = "",
        onChangeServiceType = undefined,
        onChangeSearchText = undefined
    }: SearchServiceBarProps
) {

    const handleText = (event: React.SyntheticEvent<HTMLInputElement>) => {
        if (onChangeSearchText != undefined)
            onChangeSearchText(event.currentTarget.value)
    }


    const handleServiceType = (event: ServiceType |undefined) => {
        if (onChangeServiceType != undefined)
            onChangeServiceType(event)
    }

    return <div className="search-service-bar">
        <span className={"material-icons"}>search</span>
        <input type="text" value={searchText} onChange={handleText}
               placeholder="Titre de services ou mots clefs"/>
        <div className="search-bar-input">
            <Select options={serviceTypes} value={selectServiceType} onChange={handleServiceType}
                    mapOptionToLabel={(option:ServiceType) => option.name}
                    mapOptionToValue={(option :ServiceType)=> option.ref ?? option.name} />
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