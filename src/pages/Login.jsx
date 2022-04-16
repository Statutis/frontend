import useDocumentTitle from "../useDocumentTitle";
import {useState} from "react";
import Input from "../components/UI/Input/Input";
import './../assets/app/pages/login.scss'

const Login = function () {
    useDocumentTitle("Connection")

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return <div className="content" id={"form-login"}>
        <div className="form-group">
            <label>Nom d'utilisateur :</label>
            <Input placeholder="Nom d'utilisateur ou email" icon="person    "
                   value={username} onChange={setUsername}/>
        </div>
        <div className="form-group">
            <label>Mot de passe :</label>
            <Input placeholder="Mot de passe" icon="lock"
                   value={password} onChange={setPassword}/>
        </div>
        <div className="hstack stack-end"><a href="" className="text-muted">Mot de passe oublié ?</a></div>
        <div className="hstack stack-center mt-5">
            <a href="" className="btn btn-secondary">Inscription</a>
            <button className="btn btn-primary">Connection</button>
        </div>
    </div>
}

export default Login