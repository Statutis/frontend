import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Group from "../../api/Models/Group";
import {getGroup, remove} from "../../api/GroupRepository";
import Error from "../Error";
import ConfirmDelete from "../../components/ConfirmDelete";

const GroupDelete = () => {

    const id = useParams<"id">().id;
    const [group, setGroup] = useState<Group | undefined | false>(undefined)
    const navigate = useNavigate();


    useEffect(() => {

        if (id)
            getGroup(id).then(setGroup).catch(() => setGroup(false));

    }, [id])


    if (group === undefined)
        return <div className={"fluid-content hstack stack-center"}>
            <p>Chargement en cours ....</p>
        </div>

    if (group === false)
        return <Error code={404}/>

    const description = `Vous être en train de supprimer un groupe : “${group.name}”. Une fois cette action réalisée vous ne pourrez plus revenir en arrière. Cette suppression  va également entrainer l’effacement de tous les services de groupe ainsi que tous les historiques de status liés.`;

    const title = `Voulez-vous vraiment supprimer “${group.name}” (Groupe)`

    const onCancel = () => navigate(-1)
    const onSubmit = () => {
        remove(group).then(() => {
            navigate("/search")
        })
    }

    return <ConfirmDelete description={description} title={title} onCancel={onCancel} onSubmit={onSubmit}/>
}

export default GroupDelete