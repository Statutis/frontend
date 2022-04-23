import React, {useState} from 'react';
import useDocumentTitle from "../useDocumentTitle";
import './../assets/app/pages/login.scss'
import AuthService from "../Services/AuthService";
import {useAppDispatch} from "../Store/store";
import {login} from "../Store/AuthSlice";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import FieldInput from "../components/UI/Input/FieldInput";
import * as Yup from 'yup';

interface LoginForm {
    username: string
    password: string
}


const Login = function () {
    useDocumentTitle("Connexion")

    const form = useFormik<LoginForm>({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .email("Ce n'est pas une adresse mail.")
                .required("Ce champs est requis."),
            password: Yup.string()
                .required("Ce champs est requis."),
        }),
        onSubmit: async values => {
            let res
            try {
                res = await AuthService.login(values.username, values.password);
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
    })

    const dispatcher = useAppDispatch()
    const navigate = useNavigate()


    const [error, setError] = useState<string | undefined>(undefined)


    return <form className="content" id={"form-login"} onSubmit={form.handleSubmit}>
        <FieldInput formik={form} field="username" label="Adresse mail" placeholder="Adresse mail" type="email"
                    icon="person"/>
        <FieldInput formik={form} field={"password"} label={"Mot de passe"} placeholder="Mot de passe" icon="lock"
                    type="password"/>

        <div className="vstack stack-vend">
            {error && <p className="text-danger">{error}</p>}
            <a href="" className="text-muted">Mot de passe oublié ?</a>
        </div>
        <div className="hstack stack-center mt-5">
            <Link to="/register" className="btn btn-secondary">Inscription</Link>
            <button className="btn btn-primary">Connexion</button>
        </div>
    </form>
}

export default Login
