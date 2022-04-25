import React, {useState} from "react";
import useDocumentTitle from "../../useDocumentTitle";
import "../../assets/app/pages/Service/checkType.scss"
import rackServer from "../../img/rack_server.png"
import checked from "../../img/done.png"
import {useNavigate} from "react-router-dom";

const ServicePickUpCheckType = function () {

    const navigationHelper = useNavigate();

    const navigation = () => {
        if(checkState === "DNS") {
            return navigationHelper("/services/add/dns")
        } else if(checkState === "HTTP") {
            return navigationHelper("/services/add/http")
        } else if(checkState === "ping") {
            return navigationHelper("/services/add/ping")
        } else if(checkState === "Atlassian Status Page") {
            return navigationHelper("/services/add/atlassian_status_page")
        } else {
            return;
        }
    }

    useDocumentTitle("Type de vérification")


    const [serviceTypes,] = useState<string[]>(["DNS", "HTTP", "PING", "Atlassian Status Page"]);
    const [checkState, setCheckedState] = useState<string|undefined>(undefined);

    return <div className={"content"}>
        <div className={"checkType"}>
            {
                serviceTypes.map(x => {
                    return <div className={"card" + (checkState == x ? " card-selected" : "")} key={x} onClick={() => setCheckedState(x)}>

                        {
                            checkState && checkState == x && <div className={"checked"}>
                                <img src={checked} alt={"checked"}/>
                            </div>
                        }

                        <img src={rackServer} alt={""}/>
                        <h3>{x}</h3>
                    </div>
                })
            }
        </div>

        <button className={"btn btn-green"} onClick={() => navigation()}>
            Étape suivante <span className={"material-icons"}>start</span>
        </button>
    </div>

}

export default ServicePickUpCheckType;
