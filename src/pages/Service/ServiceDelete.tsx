import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ConfirmDelete from "../../components/ConfirmDelete";
import {Service} from "../../api/Models/Service/Service";
import {getServiceByGuid, removeService} from "../../api/ServiceRepository";


const ServiceDelete = function () {

    const guid:string|undefined = useParams<"guid">().guid;

    if(guid === undefined)
        return

    const navigator = useNavigate();

    const cancelFn = () => {
        navigator(`/groups/${service?.groupRef?.split("/").reverse()[0]}`);
    }
    const submitFn = () => {

        removeService(guid).then(() => {
            navigator(`/groups/${service?.groupRef?.split("/").reverse()[0]}`);
        })
    }

    const [service,setService] = useState<Service>();

    useEffect(() => {

        getServiceByGuid(guid).then(setService);

    },[]);

    const description = `Vous être en train de supprimer un service : “${service?.name}”. Une fois cette action réalisée vous ne pourrez plus revenir en arrière.`;

    const title = `Voulez-vous vraiment supprimer “${service?.name}” (Service)`

    return <ConfirmDelete title={title} description={description} onCancel={cancelFn} onSubmit={submitFn}/>

}

export default ServiceDelete;
