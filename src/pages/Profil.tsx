import React, {createRef, LegacyRef, SyntheticEvent, useEffect, useState} from "react";
import './../assets/app/pages/profil.scss'
import useDocumentTitle from "../useDocumentTitle";
import {useAppSelector} from "../Store/store";
import User from "../api/Models/User";
import UserService from "../Services/UserService";
import UserAvatar from "../components/UserAvatar";
import Team from "../api/Models/Team";
import {getTeamsByRef} from "../api/TeamRepository";
import Badge from "../components/UI/Badge";

const imagesContentType = ["image/gif", "image/png", "image/jpeg", "image/bmp", "image/webp"]

const Profil = () => {
    const user: User = useAppSelector(state => state.auth.user) as User
    const inputFileRef: LegacyRef<HTMLInputElement> = createRef()


    const [teams, setTeams] = useState<Team[]>([]);

    useDocumentTitle("Votre profil")

    const fileChange = async (event: SyntheticEvent<HTMLInputElement>) => {
        event.stopPropagation()
        event.preventDefault()

        const files = event.currentTarget.files ?? [];

        if (files.length > 0 && imagesContentType.includes(files[0].type)) {
            await UserService.updateAvatar(files[0], user)
        }
    }

    const clearAvatar = () => UserService.updateAvatar(undefined, user)

    useEffect(() => {
        console.log("cououc")
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
                <input type="file" hidden style={{display: "none"}} ref={inputFileRef} onChange={fileChange}/>
                <button className="btn btn-red" onClick={clearAvatar}>
                    <span className="material-icons">delete</span>
                    <span>Supprimer</span>
                </button>
                <button className="btn" onClick={() => inputFileRef?.current?.click()}>
                    <span className="material-icons">cloud_upload</span>
                    &nbsp;
                    <span>Changer votre photo de profil</span>
                </button>
            </div>

        </div>
        <div>b</div>
    </div>
}
export default Profil;