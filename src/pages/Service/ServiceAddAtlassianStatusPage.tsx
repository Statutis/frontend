import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import FieldInput from "../../components/UI/Input/FieldInput";
import Select from "../../components/UI/Input/Select";
import ServiceType from "../../api/Models/Service/ServiceType";
import Group from "../../api/Models/Group";
import {getGroups} from "../../api/GroupRepository";
import {getServiceTypes} from "../../api/ServiceTypesRepository";
import useDocumentTitle from "../../useDocumentTitle";
import {useNavigate, useParams} from "react-router-dom";
import {addAtlassianStatusPage, getDns, getServiceByGuid, updateAtlassianStatusPage} from "../../api/ServiceRepository";
import {Service} from "../../api/Models/Service/Service";
import AtlassianStatusPageService from "../../api/Models/Service/AtlassianStatusPageService";

interface PingForm {
    name: string;
    groupRef: string;
    description: string;
    host: string;
    serviceTypeRef: string;
}

const ServiceAddPing = () => {

    useDocumentTitle("Ajout d'un service Type Atlassian Status Page");

    const id: string | undefined = useParams<"id">().id;
    const isEditMode = id !== undefined;

    const [groups, setGroups] = useState<Group[]>([]);
    const [serviceType, setServiceType] = useState<ServiceType[]>([]);
    const [service, setService] = useState<Service>();

    const navigator = useNavigate();

    useEffect(() => {
        if (isEditMode) {
            getServiceByGuid(id).then((x) => {
                console.log(x.detailRef)
                getDns(x.detailRef).then((val) => {
                    setService(x)
                    form.setFieldValue("name", val.name ?? "");
                    form.setFieldValue("groupRef", val.groupRef ?? "");
                    form.setFieldValue("description", val.description ?? "");
                    form.setFieldValue("host", val.host ?? "");
                    form.setFieldValue("serviceTypeRef", val.serviceTypeRef ?? "");
                    form.setFieldValue("type", val.type?.toString() ?? "");
                    form.setFieldValue("result", val.result ?? "");
                })
            });
        }
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

            const atlassianStatusPageServiceForm:AtlassianStatusPageService = new AtlassianStatusPageService();
            atlassianStatusPageServiceForm.name = values.name;
            atlassianStatusPageServiceForm.groupRef = values.groupRef;
            atlassianStatusPageServiceForm.host = values.host;
            atlassianStatusPageServiceForm.serviceTypeRef = values.serviceTypeRef;
            atlassianStatusPageServiceForm.description = values.description;


            if (isEditMode) {
                if (service === undefined || service.ref == undefined)
                    return;
                updateAtlassianStatusPage(service?.detailRef, atlassianStatusPageServiceForm).then((data) => {
                    if (data.groupRef === undefined)
                        return
                    navigator(`/groups/${data.getGroupId()}`);
                });
            } else {

                addAtlassianStatusPage(atlassianStatusPageServiceForm).then((data) => {
                    if (data.groupRef === undefined)
                        return
                    navigator(`/groups/${data.getGroupId()}`);
                });
            }
        }
    });

    return <div className={"content"}>

        <form onSubmit={form.handleSubmit} className={""}>
            <FieldInput formik={form} field={"name"} label={"Nom du service"} placeholder={"Nom du service"}/>


            <div className="form-group">
                <label htmlFor="description">Description :</label>
                <textarea id="description" onChange={form.handleChange} placeholder={"Entrez une description du service"} value={form.values.description}/>
                {form.errors.description ? <p className="text-danger">{form.errors.description}</p> : null}
            </div>

            <div className={"form-group"}>
                <label>Sélectionnez un label</label>
                <Select options={serviceType} mapOptionToLabel={x => x.name}
                        mapOptionToValue={x => x.ref ?? ""}
                        onChange={(x: ServiceType | undefined) => form.setFieldValue("serviceTypeRef", x?.ref)}
                        value={serviceType.filter(x => x.ref === form.values.serviceTypeRef)[0] ?? undefined}
                        placeholder={"Choisissez un label"} icon={"label"}
                />
            </div>

            <div className={"form-group"}>
                <label>Sélectionnez un groupe</label>
                <Select options={groups} mapOptionToLabel={x => x.name}
                        mapOptionToValue={x => x.ref ?? ""}
                        onChange={(x: Group | undefined) => form.setFieldValue("groupRef", x?.ref)}
                        value={groups.filter(x => x.ref === form.values.groupRef)[0] ?? undefined}
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
