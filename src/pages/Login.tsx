import React, {useState} from 'react';
import useDocumentTitle from "../useDocumentTitle";
import Input from "../components/UI/Input/Input";
import './../assets/app/pages/login.scss'
import AuthService from "../Services/AuthService";
import {useAppDispatch} from "../Store/store";
import {login} from "../Store/AuthSlice";
import {useNavigate} from "react-router-dom";


const Login = function () {
    useDocumentTitle("Connexion")

    const dispatcher = useAppDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string | undefined>(undefined)

    const handleLogin = async () => {
        setError(undefined)
        let res
        try {
            res = await AuthService.login(username, password);
            if (!res) {
                setError("Mot de passe ou nom d'utilisateur invalide !!")
                return
            }
            dispatcher(login(res))
            navigate("/")

        } catch (e) {
            setError("Mot de passe ou nom d'utilisateur invalide !!")
        }
    }

    return <div className="content" id={"form-login"}>

        <div className="form-group">
            <label>Nom d'utilisateur :</label>
            <Input placeholder="Nom d'utilisateur ou email" icon="person    "
                   value={username} onChange={setUsername}/>
        </div>
        <div className="form-group">
            <label>Mot de passe :</label>
            <Input placeholder="Mot de passe" icon="lock" type="password"
                   value={password} onChange={setPassword}/>
        </div>

        <div className="vstack stack-vend">
            {error && <p className="text-danger">{error}</p>}
            <a href="" className="text-muted">Mot de passe oublié ?</a>
        </div>
        <div className="hstack stack-center mt-5">
            <a href="" className="btn btn-secondary">Inscription</a>
            <button className="btn btn-primary" onClick={handleLogin}>Connexion</button>
        </div>
    </div>
}

export default Login
