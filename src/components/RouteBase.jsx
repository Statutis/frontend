import AppBase from "./AppBase";
import {Outlet} from "react-router-dom";

const RouteBase = function (){
    return <AppBase><Outlet/></AppBase>
}

export default RouteBase