import AppBase from "../components/AppBase";
import useDocumentTitle from "../useDocumentTitle";

import '../assets/app/pages/error.scss'

const Error = function (props) {

    useDocumentTitle("Erreur " + props.code)

    return <AppBase>
        <div className="content">
            <div id={"error-container"}>
                <h1>{props.code}</h1>
                <div>
                    <p>sniff ...</p>
                    <p>une erreur est survenue</p>
                </div>
            </div>
        </div>
    </AppBase>
}

export default Error