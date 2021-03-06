import React, {useEffect, useState} from "react";
import Team from "../api/Models/Team";
import ImageLoader from "./UI/ImageLoader";
import DefaultAvatar from "../img/team_avatar.png";
import {TeamAvatarUpdateEvent, TeamServiceEvent} from "../Services/TeamService";


interface TeamAvatarProps {
    team: Team,
    defaultMsg?: string,
}

const TeamAvatar = ({team, defaultMsg}: TeamAvatarProps) => {

    const [updatedAvatar, setUpdatedAvatar] = useState<string | undefined | false>(false)

    useEffect(() => {

        const handlerAvatarUpdate = (event: TeamAvatarUpdateEvent) => {
            if (team.ref == event.team.ref)
                setUpdatedAvatar(event.avatarData)
        }
        document.addEventListener(TeamServiceEvent.UpdateAvatar, handlerAvatarUpdate as EventListener)
        return () => {
            document.removeEventListener(TeamServiceEvent.UpdateAvatar, handlerAvatarUpdate as EventListener)
        }
    })

    if (updatedAvatar)
        return <img alt={team.name} src={updatedAvatar}/>

    if (team && team.avatarRef && updatedAvatar === false)
        return <ImageLoader src={team.avatarRef} alt={team.name}/>

    if (defaultMsg)
        return <p>{defaultMsg}</p>

    return <img src={DefaultAvatar} alt={team.name}/>
}

export default TeamAvatar