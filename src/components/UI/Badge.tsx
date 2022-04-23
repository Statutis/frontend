import React from "react";
import PropTypes from "prop-types";

interface BadgeProps {
    value?: string | undefined;
    icon?: string | undefined;
    color?: string | undefined;
    customClass?: string | undefined;
}

const Badge = function ({
                            value = undefined,
                            icon = undefined,
                            color = "primary",
                            customClass  = undefined,
                        }: BadgeProps) {

    if (icon === undefined) {
        return <div className={`badge badge-${color} ${customClass}`}>{value}</div>
    } else {
        return <div className={`badge badge-${color} ${customClass}`}>
            <div className={"material-icons"}>{icon}</div>
            {value}
        </div>

    }
}

export default Badge;


Badge.propTypes = {
    value: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    customClass: PropTypes.string,
}
