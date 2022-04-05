import '../assets/app/app.scss'
import useDocumentTitle from "../useDocumentTitle";

function UI() {

    useDocumentTitle("Elements Graphiques")

    return <>

        {["primary",
            "secondary",
            "green",
            "red",
            "grey",
            "dark-grey",
            "orange"].map(x => {
            return <button className={"btn btn-" + x} key={x}>.btn .btn-{x}</button>
        })}


    </>
}

export default UI;