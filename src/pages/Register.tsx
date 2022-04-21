import Input from "../components/UI/Input/Input";
import React, {useState} from "react";
import useDocumentTitle from "../useDocumentTitle";
import {useNavigate} from "react-router-dom";
import {register} from "../api/AuthRepository";

const Register = () => {
    useDocumentTitle("Créer un compte")

    const navigate = useNavigate()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [error, setError] = useState<string | undefined>(undefined)

    const [currentlyAdd, setCurrentlyAdd] = useState<boolean>(false)

    const mainValidator = function (value: string) {
        return !value.includes(" ")
    }

    const handleRegister = async () => {
        if (currentlyAdd)
            return
        setCurrentlyAdd(true)
        setError("");
        try {
            const registerState = await register({email: email, password: password, username: username})

            if (!registerState) {
                setError("Impossible d'enregistre l'utilisateur");
            } else
                navigate("/login")
        } catch (e) {

            setError("Impossible d'enregistre l'utilisateur");
        }
        setCurrentlyAdd(false)

    }

    return <div className="content" id={"form-login"}>

        <div className="form-group">
            <label>Nom d'utilisateur :</label>
            <Input placeholder="Nom d'utilisateur" icon="person"
                   value={username} onChange={setUsername}/>
            {!mainValidator(username) && <p className="text-danger">Ce champs n'est pas conforme</p>}
        </div>
        <div className="form-group">
            <label>Adresse mail :</label>
            <Input placeholder="Email" icon="alternate_email" type='email'
                   value={email} onChange={setEmail}/>
            {!mainValidator(email) && <p className="text-danger">Ce champs n'est pas conforme</p>}
            {email != "" && !(email.includes("@") && email.split("@", 2)[1].length > 0) &&
                <p className="text-danger">Votre adresse mail n'est pas valide</p>}
        </div>
        <div className="form-group">
            <label>Mot de passe :</label>
            <Input placeholder="Mot de passe" icon="lock" type="password"
                   value={password} onChange={setPassword}/>
            {!mainValidator(password) && <p className="text-danger">Ce champs n'est pas conforme</p>}
        </div>
        <div className="form-group">
            <label>Confirmer votre mot de passe :</label>
            <Input placeholder="Confirmer votre  mot de passe" icon="lock" type="password"
                   value={confirmPassword} onChange={setConfirmPassword}/>
            {!mainValidator(confirmPassword) && <p className="text-danger">Ce champs n'est pas conforme</p>}
            {confirmPassword != "" && password != "" && confirmPassword != password &&
                <p className="text-danger">Pas conforme aux mot de passe précédent</p>}
        </div>

        <div className="vstack stack-vend">
            {error && <p className="text-danger">{error}</p>}
            <a href="" className="text-muted">Mot de passe oublié ?</a>
        </div>
        <div className="hstack stack-center mt-5">
            <a href="" className="btn btn-secondary">Inscription</a>
            <button className="btn btn-primary" onClick={handleRegister}>S'inscrire</button>
        </div>
    </div>
}

export default Register;