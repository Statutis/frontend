import React, {useCallback} from "react";
import PropTypes from "prop-types";
import ProgressBar from "./ProgressBar";
import Group from "../api/Models/Group";
import {displayDelay} from "../Utils/DateManager";
import {Link} from "react-router-dom";
import GroupAvatar from "./GroupAvatar";


const defaultValue = new Group()

const GroupServiceCard = function ({value = defaultValue}) {

    const percent = useCallback(() => Math.min(value.onlineServices().length / value.services.length * 100, 100), [value]);
    const styleClassProgress = useCallback(() => {
        if (percent() < 75)
            return "progress-red"
        else if (percent() < 99)
            return "progress-orange"
        return "progress-green"
    }, [percent])

    return <div className={"card group-card"}>
        <div className={"card-content"}>
            <GroupAvatar group={value}/>
            <Link className="h2" to={"/groups/" + value.id}>{value.name}</Link>
        </div>
        <div className="card-footer">
            <div className="hstack stack-nowrap stack-vcenter w-100">
                {value.services.length <= value.onlineServices().length ?
                    <span className={"material-icons text-muted"}>check</span>
                    : <span className="text-muted"
                            style={{color: "var(--color-red)"}}>{value.onlineServices().length} / {value.services.length}</span>

                }
                <ProgressBar className={"stack-spacer " + styleClassProgress()}
                             progress={percent()}/>
            </div>
            <p className="text-muted">Dernière vérification : {displayDelay(value.lastCheck, new Date())}</p>
        </div>
    </div>
}

export default GroupServiceCard;

GroupServiceCard.propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Group)])
}