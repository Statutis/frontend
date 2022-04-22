import React from 'react';
import useDocumentTitle from "../useDocumentTitle";
import PropTypes from 'prop-types';
import '../assets/app/pages/error.scss'

const Error = function ({code = 0}) {

    useDocumentTitle("Erreur " + code)

    return<div className="content">
        <div id={"error-container"}>
            <h1>{code}</h1>
            <div>
                <p>sniff ...</p>
                <p>une erreur est survenue</p>
            </div>
        </div>
    </div>

}

export default Error

Error.propTypes = {
    code: PropTypes.number.isRequired,
}