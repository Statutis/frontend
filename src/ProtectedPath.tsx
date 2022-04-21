import React from "react";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "./Store/store";

interface ProtectedPathProps {
    role?: string | string[] | undefined
    children: JSX.Element
}

const ProtectedPath = ({role = undefined, children}: ProtectedPathProps) => {
    const user = useAppSelector(state => state.auth.user)
    if (user == undefined || (role == undefined || user.isGranted(role)))
        return <Navigate to={"/login"}/>

    return <>{children}</>

}

export default ProtectedPath