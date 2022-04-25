import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Team from "../../api/Models/Team";
import {getTeam, remove} from "../../api/TeamRepository";
import Error from "../Error";
import ConfirmDelete from "../../components/ConfirmDelete";

const TeamDelete = () => {

    const id = useParams<"id">().id;
    const [team, setTeam] = useState<Team | undefined | false>(undefined)
    const navigate = useNavigate();


    useEffect(() => {
        if (id)
            getTeam(id).then(setTeam).catch(() => setTeam(false));

    }, [id])

    if (team === undefined)
        return <div className={"fluid-content hstack stack-center"}>
            <p>Chargement en cours ....</p>
        </div>

    if (team === false)
        return <Error code={404}/>

    const description = `Vous être en train de supprimer une équipe : “${team.name}”. Une fois cette action réalisée vous ne pourrez plus revenir en arrière.`;

    const title = `Voulez-vous vraiment supprimer “${team.name}” (Equipe)`

    const onCancel = () => navigate(-1)
    const onSubmit = () => {
        remove(team).then(() => {
            navigate("/teams")
        })
    }

    return <ConfirmDelete description={description} title={title} onCancel={onCancel} onSubmit={onSubmit}/>
}

export default TeamDelete