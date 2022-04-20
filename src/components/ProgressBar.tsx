import React from "react";
import PropTypes from 'prop-types';

const ProgressBar = function ({className = '', progress = 0}) {
    return <div className={"progress " + className}>
        <div className="progress-bar" style={{width: (progress) + "%"}}/>
    </div>
}

export default ProgressBar;

ProgressBar.propTypes = {
    className: PropTypes.string,
    progress: PropTypes.number,
}