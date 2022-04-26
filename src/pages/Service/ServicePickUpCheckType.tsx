import React, {useState} from "react";
import useDocumentTitle from "../../useDocumentTitle";
import "../../assets/app/pages/Service/checkType.scss"
import checked from "../../img/done.png"
import {useNavigate} from "react-router-dom";

import DnsLogo from "../../img/dnsLogo.png"
import HttpLogo from "../../img/HttpLogo.png"
import PingLogo from "../../img/pingLogo.png"
import AtlassianLogo from "../../img/atlassianLogo.png"

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


    const serviceTypes = {"DNS": DnsLogo, "HTTP": HttpLogo, "Ping": PingLogo, "Atlassian Status Page": AtlassianLogo}
    const [checkState, setCheckedState] = useState<string|undefined>(undefined);

    return <div className={"content"}>
        <div className={"checkType"}>
            {
                Object.entries(serviceTypes).map(([x, value]) => {
                    return <div className={"card" + (checkState == x ? " card-selected" : "")} key={x} onClick={() => setCheckedState(x)}>

                        {
                            checkState && checkState == x && <div className={"checked"}>
                                <img src={checked} alt={"checked"}/>
                            </div>
                        }

                        <img src={value} alt={""}/>
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
