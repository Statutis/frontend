import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Team from "../../api/Models/Team";
import Error from "../Error";
import {getTeam} from "../../api/TeamRepository";
import useDocumentTitle from "../../useDocumentTitle";
import Badge from "../../components/UI/Badge";
import "./../../assets/app/pages/Team/details.scss"
import {useAppSelector} from "../../Store/store";
import Group from "../../api/Models/Group";
import User from "../../api/Models/User";
import {getGroupByRef} from "../../api/GroupRepository";
import GroupServiceCard from "../../components/GroupServiceCard";
import {getUserByRef} from "../../api/UserRepository";
import UserAvatar from "../../components/UserAvatar";
import FileInput from "../../components/UI/Input/FileInput";
import TeamService from "../../Services/TeamService";
import TeamAvatar from "../../components/TeamAvatar";

const imagesContentType = ["image/gif", "image/png", "image/jpeg", "image/bmp", "image/webp"]

const TeamDetails = () => {
    useDocumentTitle("Details sur une équipe")
    const user = useAppSelector(state => state.auth.user);

    const id = useParams<"id">().id;

    const [team, setTeam] = useState<Team | undefined | false>(undefined)
    const [groups, setGroups] = useState<Group[]>([])
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        if (id)
            getTeam(id).then(setTeam).catch(() => setTeam(false));

    }, [id])

    useEffect(() => {
        if (team) {
            Promise.all(team.groupRef.map(getGroupByRef)).then(setGroups)
            Promise.all(team.userRef.map(getUserByRef)).then(setUsers)
        }

    }, [team])

    if (team === undefined)
        return <div className={"fluid-content hstack stack-center"}>
            <p>Chargement en cours ....</p>
        </div>

    if (team === false)
        return <Error code={404}/>


    const fileChange = async (file: File | undefined) => {
        await TeamService.updateAvatar(file, team)
    }

    const clearAvatar = () => TeamService.updateAvatar(undefined, team)

    const hasRight = (): boolean => {
        if (!user || !team || !team.ref)
            return false;

        return user.isAdmin() || user.teamsRef.includes(team.ref)
    }

    return <div className="fluid-content" id="team-details">
        <div className="overview">
            <h2>{team.name}</h2>
            <div className="hstack">
                <Badge value={team.userRef.length + " utilisateurs"} icon={"person"} color={"grey"}
                       customClass={"badge-reverse"}/>
                <Badge value={team.groupRef.length + " groupes"} icon={"style"} color={"grey"}
                       customClass={"badge-reverse"}/>
            </div>


            <div className={"hstack stack-end stack-vcenter"}>
                {hasRight() && <>
                    <Link to={"/teams/" + team.id + "/delete"} className="btn btn-red">
                        <span className="material-icons">delete</span>
                        Supprimer l'équipe
                    </Link>
                    <Link to={"/teams/" + team.id + "/edit"} className="btn">
                        <span className="material-icons">edit</span>
                        Editer l'équipe
                    </Link>
                </>
                }
            </div>

            <h3 className="mt-6">Avatar de l'équipe : </h3>
            <div className="card" id="avatarProfil">
                <div className="card-content vstack stack-vcenter stack-center">
                    <TeamAvatar team={team}/>
                </div>
            </div>
            <div className={"hstack stack-center stack-vcenter mt-4"}>
                {hasRight() && <>
                    <button className="btn btn-red" onClick={clearAvatar}>
                        <span className="material-icons">delete</span>
                        <span>Supprimer</span>
                    </button>
                    <FileInput onFileChange={fileChange} contentTypes={imagesContentType}>
                        <span className="material-icons">cloud_upload</span>
                        <span>&nbsp; Changer</span>
                    </FileInput>
                </>}
            </div>
        </div>
        <div>
            <h3>Liste des utilisateurs : </h3>
            <div id="user-list">
                {users.length > 0 ? users.map(x => <div className="card" key={x.ref}>
                        <div className="card-content">
                            <UserAvatar user={x}/>
                            <div>
                                <h4>{x.completeName()}</h4>
                                <div className="hstack">
                                    <Badge value={x.email} icon={"alternate_email"} color={"grey"}
                                           customClass={"badge-reverse"}/>
                                    <Badge value={x.username} icon={"sell"} color={"grey"}
                                           customClass={"badge-reverse"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <p>Aucun utilisateur n'est liè à cette équipe.</p>}
            </div>

            <h3 className="mt-5">Liste des groupes : </h3>
            <div id="group-list">
                {groups.length > 0 ? groups.map(x => <GroupServiceCard key={x.ref} value={x}/>) :
                    <p>Aucun groupe n'est liè à cette équipe.</p>}
            </div>

            <div className={"hstack stack-end mt-5"}>
                {hasRight() && <Link to={"/groups/add"} className="btn btn-green">
                    <span className="material-icons">add</span> &nbsp;
                    Ajouter un groupe
                </Link>
                }
            </div>
        </div>
    </div>
}

export default TeamDetails