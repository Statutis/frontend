import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Service, ServiceState} from "../api/Models/Service/Service";
import {HistoryEntry} from "../api/Models/History/HistoryEntry";
import {getHistoryByRef} from "../api/HistoryEntryRepository";
import {ResponsiveLineCanvas, Serie} from "@nivo/line";

const defaultValue: Service = new Service();

const ServiceCard = function ({value = defaultValue}) {

    const [history, setHistory] = useState<HistoryEntry[]>();
    const [data, setdata] = useState<Serie[]>([]);
    useEffect(() => {
        getHistoryByRef(value.historyRef).then(setHistory);
    }, []);


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

    return <div className={"service"}>
        <p>{value.name}</p>

        <div className={"chart"}>

            <ResponsiveLineCanvas data={data} enableGridX={false} enableGridY={false} yScale={{ type: 'linear', min: 0, max: 1 }} enableArea={true} enableCrosshair={false} isInteractive={false}/>

        </div>
    </div>

}

export default ServiceCard;

ServiceCard.propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Service)])
}
