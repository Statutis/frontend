import React, {useEffect, useState} from "react";
import User from "../api/Models/User";
import {useAppSelector} from "../Store/store";
import ImageLoader from "./UI/ImageLoader";
import DefaultUserAvatar from './../img/user_avatar.png';
import {AvatarUpdateEvent, UserServiceEvent} from "../Services/UserService";

interface UserAvatarProps {
    user?: User,
    defaultMsg?: string,
}

const UserAvatar = ({defaultMsg, ...props}: UserAvatarProps) => {
    const user = props.user ?? useAppSelector(state => state.auth.user)

    if (!user)
        return <></>

    const [updatedAvatar, setUpdatedAvatar] = useState<string | undefined | false>(false)

    useEffect(() => {

        const handlerAvatarUpdate = (event: AvatarUpdateEvent) => {
            if (user.ref == event.user.ref)
                setUpdatedAvatar(event.avatarData)
        }

        document.addEventListener(UserServiceEvent.UpdateAvatar, handlerAvatarUpdate as EventListener)
        return () => {
            document.removeEventListener(UserServiceEvent.UpdateAvatar, handlerAvatarUpdate as EventListener)
        }
    })

    if (updatedAvatar)
        return <img alt={user.email} src={updatedAvatar}/>

    if (user && user.avatarRef && updatedAvatar === false)
        return <ImageLoader src={user.avatarRef} alt={user.email}/>

    if (defaultMsg)
        return <p>{defaultMsg}</p>

    return <img src={DefaultUserAvatar} alt={user.email}/>


}

export default UserAvatar