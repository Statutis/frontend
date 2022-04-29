import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import FieldInput from "../../components/UI/Input/FieldInput";
import Select from "../../components/UI/Input/Select";
import ServiceType from "../../api/Models/Service/ServiceType";
import Group from "../../api/Models/Group";
import {getGroups} from "../../api/GroupRepository";
import {getServiceTypes} from "../../api/ServiceTypesRepository";
import useDocumentTitle from "../../useDocumentTitle";
import PingService from "../../api/Models/Service/PingService";
import {useNavigate} from "react-router-dom";
import addPing from "../../api/ServiceRepository";

interface PingForm {
    name: string;
    groupRef: string;
    description: string;
    host: string;
    serviceTypeRef: string;
}

const ServiceAddPing = () => {

    useDocumentTitle("Ajout d'un service Type Ping");

    const [groups, setGroups] = useState<Group[]>([]);
    const [serviceType, setServiceType] = useState<ServiceType[]>([]);

    const navigator = useNavigate();

    useEffect(() => {

        getGroups().then(setGroups);
        getServiceTypes().then(setServiceType);

    }, [])

    const form = useFormik<PingForm>({
        initialValues: {
            name: "",
            groupRef: "",
            description: "",
            host: "",
            serviceTypeRef: ""
        },
        onSubmit: (values) => {

            const data:PingService = new PingService();
            data.name = values.name;
            data.groupRef = values.groupRef;
            data.host = values.host;
            data.serviceTypeRef = values.serviceTypeRef;
            data.description = values.description;


            addPing(data).then((resp) => {
                if(resp.groupRef === undefined)
                    return;

                navigator(`/groups/${resp.getGroupId()}`)
            });

        }
    });

    return <div className={"content"}>

        <form onSubmit={form.handleSubmit} className={""}>
            <FieldInput formik={form} field={"name"} label={"Nom du service"} placeholder={"Nom du service"}/>


            <div className="form-group">
                <label htmlFor="description">Description :</label>
                <textarea id="description" onChange={form.handleChange} placeholder={"Entrez une description du service"}/>
                {form.errors.description ? <p className="text-danger">{form.errors.description}</p> : null}
            </div>

            <div className={"form-group"}>
                <label>Sélectionnez un label</label>
                <Select options={serviceType} mapOptionToLabel={x => x.name}
                        mapOptionToValue={x => x.ref ?? ""} onChange={(x:ServiceType|undefined) => form.setFieldValue("serviceTypeRef", x?.ref)}
                        placeholder={"Choisissez un label"} icon={"label"}
                />
            </div>

            <div className={"form-group"}>
                <label>Sélectionnez un groupe</label>
                <Select options={groups} mapOptionToLabel={x => x.name}
                        mapOptionToValue={x => x.ref ?? ""} onChange={(x:Group|undefined) => form.setFieldValue("groupRef", x?.ref)}
                        placeholder={"Choisissez un groupe"}
                />
            </div>

            <FieldInput formik={form} field={"host"} label={"Hôte (IP ou FQDN)"} icon={"crisis_alert"} placeholder={"0.0.0.0 ou domain.tld"}/>


            <button type={"submit"} className={"btn btn-green"}>
                <span className={"material-icons"}>save</span> Sauvegarder
            </button>
        </form>

    </div>
}

export default ServiceAddPing;
