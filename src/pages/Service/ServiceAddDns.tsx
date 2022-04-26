import React, {useEffect, useState} from "react";
import useDocumentTitle from "../../useDocumentTitle";
import {useFormik} from "formik";
import FieldInput from "../../components/UI/Input/FieldInput";
import Select from "../../components/UI/Input/Select";
import Group from "../../api/Models/Group";
import {getGroups} from "../../api/GroupRepository";
import "../../assets/app/pages/Service/addService.scss"
import ServiceType from "../../api/Models/Service/ServiceType";
import {getServiceTypes} from "../../api/ServiceTypesRepository";
import DnsService from "../../api/Models/Service/DnsService";
import {addDns} from "../../api/ServiceRepository";
import {useNavigate} from "react-router-dom";

interface dnsServiceForm {
    name: string,
    groupRef: string,
    description: string,
    host: string,
    serviceTypeRef: string,
    type: string,
    result: string
}

const ServiceAddDns = () => {

    useDocumentTitle("Ajout d'un service Type DNS")

    const navigation = useNavigate();

    const [groups, setGroups] = useState<Group[]>([]);
    const [serviceType, setServiceType] = useState<ServiceType[]>([]);

    useEffect(() => {

        getGroups().then(setGroups);
        getServiceTypes().then(setServiceType);

    }, [])

    const form = useFormik<dnsServiceForm>({
        initialValues: {
            name: "",
            groupRef: "",
            description: "",
            host: "",
            serviceTypeRef: "",
            type: "",
            result: ""
        },
        onSubmit: values => {
            const dnsService:DnsService = new DnsService();
            dnsService.name = values.name;
            dnsService.groupRef = values.groupRef;
            dnsService.description = values.description;
            dnsService.host = values.host;
            dnsService.serviceTypeRef = values.serviceTypeRef;

            dnsService.result = values.result;
            dnsService.type = values.type;
            addDns(dnsService).then((resp) => navigation(`/groups/${resp.getGroupId()}`))
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
            <FieldInput formik={form} field={"type"} label={"Type de vérification (A, AAA, CNAME)"} icon={"dns"} placeholder={"A / AAA / CNAME"}/>
            <FieldInput formik={form} field={"result"} label={"Résultat attendue"} icon={"check_circle"} placeholder={"Résultat attendue"}/>

            <button type={"submit"} className={"btn btn-green"}>
                <span className={"material-icons"}>save</span> Sauvegarder
            </button>
        </form>
    </div>

}

export default ServiceAddDns;

