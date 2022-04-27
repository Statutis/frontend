import React, {useEffect, useState} from "react";
import ImageLoader from "./UI/ImageLoader";
import DefaultAvatar from "../img/group_avatar.png";
import Group from "../api/Models/Group";
import {GroupAvatarUpdateEvent, GroupServiceEvent} from "../Services/GroupService";


interface GroupAvatarProps {
    group: Group,
    defaultMsg?: string,
}

const GroupAvatar = ({group, defaultMsg}: GroupAvatarProps) => {

    const [updatedAvatar, setUpdatedAvatar] = useState<string | undefined | false>(false)

    useEffect(() => {

        const handlerAvatarUpdate = (event: GroupAvatarUpdateEvent) => {
            if (group.ref == event.team.ref)
                setUpdatedAvatar(event.avatarData)
        }
        document.addEventListener(GroupServiceEvent.UpdateAvatar, handlerAvatarUpdate as EventListener)
        return () => {
            document.removeEventListener(GroupServiceEvent.UpdateAvatar, handlerAvatarUpdate as EventListener)
        }
    })

    if (updatedAvatar)
        return <img alt={group.name} src={updatedAvatar}/>

    if (group && group.avatarRef && updatedAvatar === false)
        return <ImageLoader src={group.avatarRef} alt={group.name}/>

    if (defaultMsg)
        return <p>{defaultMsg}</p>

    return <img src={DefaultAvatar} alt={group.name}/>
}

export default GroupAvatar