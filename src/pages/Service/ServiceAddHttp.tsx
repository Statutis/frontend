import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import useDocumentTitle from "../../useDocumentTitle";
import Group from "../../api/Models/Group";
import ServiceType from "../../api/Models/Service/ServiceType";
import {getGroups} from "../../api/GroupRepository";
import {getServiceTypes} from "../../api/ServiceTypesRepository";
import FieldInput from "../../components/UI/Input/FieldInput";
import Select from "../../components/UI/Input/Select";
import HttpService from "../../api/Models/Service/HttpService";
import {addHttp} from "../../api/ServiceRepository";
import {useNavigate} from "react-router-dom";

interface httpForm {
    name:string;
    groupRef:string;
    description:string;
    host:string;
    serviceTypeRef: string;
    port:number|null;
    code:number|null;
    redirectUrl:string|null;
}

const ServiceAddHttp = () => {

    useDocumentTitle("Ajout d'un service Type Http")

    const redirector = useNavigate();

    const form = useFormik<httpForm>({
        initialValues: {
            name: "",
            groupRef: "",
            description: "",
            host: "",
            serviceTypeRef: "",
            port: null,
            code: null,
            redirectUrl: null
        },
        onSubmit: (values) => {
            console.log(values);
            const form:HttpService = new HttpService();
            form.name = values.name;
            form.groupRef = values.groupRef;
            form.description = values.description;
            form.host = values.host;
            form.serviceTypeRef = values.serviceTypeRef
            if(values.port !== null)
                form.port = values.port;
            if(values.code !== null)
                form.code = values.code
            if(values.redirectUrl !== null)
                form.redirectUrl = values.redirectUrl

            addHttp(form).then((data) => {
                if(data.groupRef === undefined)
                    return
                redirector(`/groups/${data.getGroupId()}`);
            });
        }
    });

    const [groups, setGroups] = useState<Group[]>([]);
    const [serviceType, setServiceType] = useState<ServiceType[]>([]);

    useEffect(() => {

        getGroups().then(setGroups);
        getServiceTypes().then(setServiceType);

    }, [])

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
            <FieldInput formik={form} field={"port"} label={"Port de la requête"} icon={"savings"} placeholder={"Port de la requête"}/>
            <FieldInput formik={form} field={"code"} label={"Code HTTP Attendue"} icon={"http"} placeholder={"Code HTTP Attendue (200,403 ...)"}/>
            <FieldInput formik={form} field={"redirectUrl"} label={"Spécifiez si il y a une redirection"} icon={"refresh"} placeholder={"IP ou FQDN de la redirection"}/>

            <button type={"submit"} className={"btn btn-green"}>
                <span className={"material-icons"}>save</span> Sauvegarder
            </button>
        </form>

    </div>

}

export default ServiceAddHttp;
