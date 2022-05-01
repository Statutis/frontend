import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Service, ServiceState} from "../api/Models/Service/Service";
import {HistoryEntry} from "../api/Models/History/HistoryEntry";
import {getHistoryByRef} from "../api/HistoryEntryRepository";
import {ResponsiveLineCanvas, Serie} from "@nivo/line";
import ServiceType from "../api/Models/Service/ServiceType";
import {getServiceTypeByRef} from "../api/ServiceTypesRepository";
import Badge from "./UI/Badge";
import {Link, useNavigate} from "react-router-dom";

const defaultValue: Service = new Service();

const ServiceCard = function ({value = defaultValue}) {

    const navigator = useNavigate();

    const deleteFn = function () {
        navigator("/services/delete/"+value.ref?.split("/").reverse()[0]);
    }

    const [history, setHistory] = useState<HistoryEntry[]>();
    const [data, setdata] = useState<Serie[]>([]);
    const [serviceType, setServiceType] = useState<ServiceType | undefined>(undefined);


    useEffect(() => {
        getHistoryByRef(value.historyRef).then(setHistory);
        getServiceTypeByRef(value.serviceTypeRef ?? "").then(setServiceType)
    }, [value]);


    useEffect(() => {
        const tmpData: Serie = {
            id: "Online Services",
            color: "black",
            data: []
        }

        history?.reverse().forEach((x) => {

            tmpData.data.push(
                {
                    "x": new Date(x.dateTime).getTime(),
                    "y": (x.state === ServiceState.Online) ? 1 : 0
                }
            )
        })

        setdata(() => [tmpData])

    }, [history])

    const circleDotColor = (state: ServiceState) => {
        switch (state) {
            case ServiceState.Online:
                return "green";
            case ServiceState.Error:
            case ServiceState.Unreachable:
                return "red";
        }
        return "primary"
    }

    return <div className={"service card"}>
        <div className={"vstack"}>
            <div className="hstack stack-vend">
                <div className={"circle-dot circle-dot-" + circleDotColor(value.state)}/>
                <Link className="h4" to="#">{value.name} </Link>
                <span className="text-muted">{value.checkType}</span>
                <span className={"text-button material-icons text-button-hover-orange"}>edit_note</span>
                <span className={"text-button material-icons text-button-hover-red"} onClick={deleteFn}>delete</span>
            </div>

            <div className={"hstack stack-vcenter"}>
                {serviceType &&
                    <Badge customClass={"badge-reverse"} color={"grey"} icon={"style"}
                           value={"Type : " + serviceType.name}/>}
                <Badge customClass={"badge-reverse"} color={"grey"} icon={"update"}
                       value={"Dernière vérification : " + (value.lastCheck ? value.lastCheck.toLocaleDateString() + " " + value.lastCheck.toLocaleTimeString() : "jamais")}/>
                <Badge customClass={"badge-reverse"} color={"grey"} icon={"crisis_alert"}
                       value={"Hôte : " + value.host}/>

            </div>
        </div>

        <div className={"chart"}>

            <ResponsiveLineCanvas data={data} enableGridX={false} enableGridY={false} enablePoints={false}
                                  yScale={{type: 'linear', min: 0, max: 1.2}} enableArea={true} enableCrosshair={false}
                                  isInteractive={false}/>

        </div>
    </div>

}

export default ServiceCard;

ServiceCard.propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Service)])
}
