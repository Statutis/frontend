import React, {useEffect, useState} from "react";
import './../assets/app/pages/profil.scss'
import useDocumentTitle from "../useDocumentTitle";
import {useAppSelector} from "../Store/store";
import User from "../api/Models/User";
import UserService from "../Services/UserService";
import UserAvatar from "../components/UserAvatar";
import Team from "../api/Models/Team";
import {getTeamsByRef} from "../api/TeamRepository";
import Badge from "../components/UI/Badge";
import ChangePersonalData from "../components/Profil/ChangePersonalData";
import ChangePassword from "../components/Profil/ChangePassword";
import FileInput from "../components/UI/Input/FileInput";

const imagesContentType = ["image/gif", "image/png", "image/jpeg", "image/bmp", "image/webp"]

const Profil = () => {
    const user: User = useAppSelector(state => state.auth.user) as User
    const [teams, setTeams] = useState<Team[]>([]);

    useDocumentTitle("Votre profil")

    const fileChange = async (file: File | undefined) => {
        await UserService.updateAvatar(file, user)
    }

    const clearAvatar = () => UserService.updateAvatar(undefined, user)

    useEffect(() => {
        const prom = user.teamsRef.map(async x => await getTeamsByRef(x));
        Promise.all(prom).then(setTeams)
    }, [user])


    return <div className="fluid-content" id="my-profil">
        <div>
            <h1>{user.completeName()}</h1>

            <div className={"hstack"}>
                {teams.map(x => {
                    return <Badge key={x.ref} value={`Equipe: ${x.name}`} icon={"group"} color={"grey"}
                                  customClass={"badge-reverse"}/>
                })}
            </div>
            <h2 className="h3 mt-5">Votre Avatar : </h2>
            <div className="card" id="avatarProfil">
                <div className="card-content vstack stack-vcenter stack-center">
                    <UserAvatar/>
                </div>
            </div>
            <div className={"hstack stack-center stack-vcenter mt-4"}>
                <button className="btn btn-red" onClick={clearAvatar}>
                    <span className="material-icons">delete</span>
                    <span>Supprimer</span>
                </button>
                <FileInput onFileChange={fileChange} contentTypes={imagesContentType}>
                    <span className="material-icons">cloud_upload</span>
                    <span>&nbsp; Changer votre photo de profil</span>
                </FileInput>
            </div>

        </div>
        <div>
            <h2>Vos informations personnelles :</h2>
            <ChangePersonalData user={user}/>
            <h2 className="mt-6">Changer votre mot de passe :</h2>
            <ChangePassword user={user}/>
        </div>
    </div>
}
export default Profil;