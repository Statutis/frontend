import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Service} from "../api/Models/Service/Service";
import {HistoryEntry} from "../api/Models/History/HistoryEntry";
import {getHistoryByRef} from "../api/HistoryEntryRepository";
import {Line} from "react-chartjs-2";

import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const defaultValue:Service = new Service();

const valueToY = {
    "Online" : 1,
    "Unknown" : 2,
    "Unreachable" : 3,
    "Error" : 0,
}


const ServiceCard = function({value = defaultValue}) {

    const [history, setHistory] = useState<HistoryEntry[]>();
    const [labels, setLabels] = useState<string[]>([]);
    const [values, setValues] = useState<number[]>([]);
    useEffect(() => {
        getHistoryByRef(value.historyRef).then(setHistory);
    }, []);


    useEffect(() => {

        history?.forEach((x) => {
            setLabels(prevState => [...prevState, x.dateTime.toString()])
            setValues(prevState => [...prevState, valueToY["Online"]])

            console.log(x.state.toString());

            return;
        })

        return;

    }, [history])

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: values,
                borderColor: 'black',
                backgroundColor: '#FFFFFF'
            }
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: false,
                ticks: {
                    callback: (value:number) => {
                        switch (value) {
                            case 1:
                                return "Online";
                            case 2:
                                return "Unknown"
                            case 3:
                                return "Unreachable"
                            case 0:
                                return "Error"
                            default:
                                return ""
                        }
                    }
                }
            }
        }
    };

    return <div className={"service"}>
        {value.name}

        <div className={"chart"}>

            <Line data={data} options={options} />

        </div>
    </div>

}

export default ServiceCard;

ServiceCard.propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Service)])
}
