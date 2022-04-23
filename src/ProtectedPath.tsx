import React from "react";
import {useAppSelector} from "./Store/store";
import Error from "./pages/Error";

interface ProtectedPathProps {
    role?: string | string[] | undefined
    children: JSX.Element
}

const ProtectedPath = ({role = undefined, children}: ProtectedPathProps) => {
    const user = useAppSelector(state => state.auth.user)
    if (user == undefined || (role != undefined && !user.isGranted(role)))
        return <Error code={403}/>

    return <>{children}</>

}

export default ProtectedPath