import NavTop from "../components/UI/NavTop";
import './../assets/app.scss'

function UI() {
    return <>
        <NavTop/>

        {["primary",
            "secondary",
            "green",
            "red",
            "grey",
            "dark-grey",
            "orange"].map(x=>{
                return <button className={"btn btn-"+x}>.btn .btn-{x}</button>
        })}


    </>
}

export default UI;