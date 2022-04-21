import React from "react";
import PropTypes from "prop-types";
import {Service} from "../api/Models/Service/Service";

const defaultValue:Service = new Service();

const ServiceCard = function({value = defaultValue}) {

    return <div className={"service"}>
        {value.name}

    </div>

}

export default ServiceCard;

ServiceCard.propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Service)])
}
