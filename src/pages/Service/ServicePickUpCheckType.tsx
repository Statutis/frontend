import React, {useEffect, useState} from "react";
import useDocumentTitle from "../../useDocumentTitle";
import "../../assets/app/pages/Service/checkType.scss"
import rackServer from "../../img/rack_server.png"
import checked from "../../img/done.png"
import {getCheckTypes} from "../../api/ServiceRepository";
const ServicePickUpCheckType = function (){

    useDocumentTitle("Type de vérification")


    const [serviceTypes, setServiceTypes] = useState<string[]>([]);

    useEffect(() => {
        getCheckTypes().then(setServiceTypes);
    }, [])

    return <div className={"content"}>
        <div className={"checkType"}>
        {
            serviceTypes.map(x => {
                return <div className={"card card-selected"} key={x}>
                    <div className={"checked"}>
                        <img src={checked} alt={"checked"}/>
                    </div>
                    <img src={rackServer} alt={""}/>
                    <h3>{x}</h3>
                </div>
            })
        }
        </div>
    </div>

}

export default ServicePickUpCheckType;
