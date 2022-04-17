import React, {useCallback} from "react";
import PropTypes from "prop-types";
import RackServerImage from "../img/rack_server.png";
import ProgressBar from "./ProgressBar";
import Group from "../api/Models/Group";


const defaultValue = new Group()

const GroupServiceCard = function ({value = defaultValue}) {

    const percent = useCallback(() => Math.min(value.countServiceOnline / value.countService * 100, 100), [value]);
    const styleClassProgress = useCallback(() => {
        if (percent() < 75)
            return "progress-red"
        else if (percent() < 99)
            return "progress-orange"
        return "progress-green"
    }, [percent])

    return <div className={"card group-card"}>
        <div className={"card-media"}>
            <img src={RackServerImage} alt="Rack Server"/>
        </div>
        <div className={"card-content"}>
            <h2>{value.name}</h2>
            <p>{value.description}</p>
        </div>
        <div className="card-footer">
            <div className="hstack stack-nowrap stack-vcenter w-100">
                {value.countService <= value.countServiceOnline ?
                    <span className={"material-icons text-muted"}>check</span>
                    : <span className="text-muted">{value.countServiceOnline} / {value.countService}</span>

                }
                <ProgressBar className={"stack-spacer " + styleClassProgress()}
                             progress={percent()}/>
            </div>
            <p className="text-muted">Dernière vérification : {value.lastCheck}</p>
        </div>
    </div>
}

export default GroupServiceCard;

GroupServiceCard.propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Group)])
}