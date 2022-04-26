import React, {useEffect, useState} from "react";

import './../../assets/app/pages/Team/list.scss'
import useDocumentTitle from "../../useDocumentTitle";
import Team from "../../api/Models/Team";
import {getTeams} from "../../api/TeamRepository";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../Store/store";
import TeamAvatar from "../../components/TeamAvatar";

const TeamList = () => {

    useDocumentTitle("Liste des équipes")
    const [teams, setTeams] = useState<Team[]>([]);
    const user = useAppSelector(state => state.auth.user)

    useEffect(() => {
        getTeams().then(setTeams)
    }, [])

    return <div className={"content"} id="team-list">
        {teams.map(x => {
            return <div className={"card"} key={x.ref}>
                <div className={"card-content vstack stack-vcenter"}>
                    <TeamAvatar team={x}/>
                    <Link className="h3" to={"/teams/" + x.id}>{x.name}</Link>
                    <div className="hstack stack-vcenter stack-center text-muted">
                        <div className="hstack stack-vcenter" title="Nombre d'utilisateurs">
                            <span className="material-icons mx-0">person</span>
                            <span className="mx-0">{x.userRef.length}</span>
                        </div>
                        <div className="hstack stack-vcenter" title="Nombre de groupes">
                            <span className="material-icons mx-0">style</span>
                            <span className="mx-0">{x.groupRef.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        })}
        <div className="hstack stack-center mt-4">
            {user && <Link to={"/teams/add"} className={"btn"}>
                <span className="material-icons">add</span>
                Ajouter une équipe
            </Link>}
        </div>
    </div>
}

export default TeamList;