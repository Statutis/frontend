import React, {useEffect, useState} from "react";
import useDocumentTitle from "../../useDocumentTitle";
import {getGroup} from "../../api/GroupRepository";
import Group from "../../api/Models/Group";
import {Navigate, useParams} from "react-router-dom";
import "../../assets/app/pages/Group/groupOverview.scss"
import Badge from "../../components/UI/Badge";

const GroupOverview = () => {

    useDocumentTitle("Groupes")

    const id = useParams<"id">().id;
    if(id === undefined)
        return <Navigate to={"/"}/>

    const [groups, setGroups] = useState<Group>(new Group())

    useEffect(() => {
        getGroup(id).then(setGroups)
    }, []);

    return <div className={"content group-overview-card"}>
        <div className={"overview"}>
            <h2>{groups.name}</h2>
            <p>{groups.description}</p>
            <div className={"badges"}>
                <Badge value={`Equipe: ${groups.teamsRef}`} icon={"group"} color={"grey"} customClass={"badge-reverse"}/>
                <Badge value={`TODO`} icon={"style"} color={"grey"} customClass={"badge-reverse"}/>
            </div>
        </div>
        <div className={"services"}>

        </div>
    </div>
}

export default GroupOverview;
