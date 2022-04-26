import React from "react";
import useDocumentTitle from "../useDocumentTitle";

interface ConfirmDeleteProps {
    title: string
    description: string
    onCancel: () => void
    onSubmit: () => void
}

const ConfirmDelete = (props: ConfirmDeleteProps) => {

    useDocumentTitle(props.title)

    return <div className="content vstack stack-center">
        <p style={{textAlign: "center"}}>{props.description}</p>
        <div className={"hstack stack-center"}>
            <button onClick={props.onCancel} className="btn btn-green">
                <span className="material-icons">reply</span>
                Annuler
            </button>
            <button onClick={props.onSubmit} className="btn btn-red">
                <span className="material-icons">delete_forever</span>
                Valider
            </button>
        </div>
    </div>
}

export default ConfirmDelete;