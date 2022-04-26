import React, {useState} from "react";
import useDocumentTitle from "../useDocumentTitle";
import {Link, useNavigate} from "react-router-dom";
import {register} from "../api/AuthRepository";
import {useFormik} from "formik";
import * as Yup from "yup"
import FieldInput from "../components/UI/Input/FieldInput";

interface RegisterForm {
    "username": string;
    "name": string;
    "firstname": string;
    "password": string;
    "confirmPassword": string;
    "email": string;
}

const Register = () => {
    useDocumentTitle("Créer un compte")


    const form = useFormik<RegisterForm>({
            initialValues: {
                name: "",
                firstname: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            },
            validationSchema: Yup.object({
                name: Yup.string()
                    .min(3, 'Doit être faire au moins 3 caractères.')
                    .required("Ce champs est requis."),
                firstname: Yup.string()
                    .min(3, 'Doit être faire au moins 3 caractères.')
                    .required("Ce champs est requis."),
                username: Yup.string()
                    .min(3, 'Doit être faire au moins 3 caractères.')
                    .required("Ce champs est requis."),
                email: Yup.string()
                    .email("Ce n'est pas une adresse mail.")
                    .required("Ce champs est requis."),
                password: Yup.string()
                    .min(8, "Doit être faire au moins 8 caractères.")
                    .required("Ce champs est requis."),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref("password"), null], "Les mots de passes ne correspondent pas.")
                    .required("Ce champs est requis.")
            }),
            onSubmit: async values => {
                const registerState = await register({
                    email: values.email,
                    password: values.password,
                    username: values.username,
                    name: values.name,
                    firstname: values.firstname,
                })

                if (!registerState) {
                    setError("Impossible d'enregistre l'utilisateur");
                } else
                    navigate("/login")
            }
        }
    )

    const navigate = useNavigate()

    const [error, setError] = useState<string | undefined>(undefined)


    return <form className="content" onSubmit={form.handleSubmit}>

        <div className="grid2">
            <FieldInput formik={form} field={"username"} label={"Nom d'utilisateur"} placeholder={"Nom d'utilisateur"}/>
            <FieldInput formik={form} field={"email"} label={"Adresse mail"} placeholder={"Adresse mail"} icon="alternate_email"/>
            <FieldInput formik={form} field={"name"} label={"Nom"} placeholder={"Nom"} icon="badge"/>
            <FieldInput formik={form} field={"firstname"} label={"Prénom"} placeholder={"Prénom"} icon="badge"/>
            <FieldInput formik={form} field={"password"} label={"Mot de passe"} placeholder={"Mot de passe"}
                        type="password" icon="password"/>
            <FieldInput formik={form} field={"confirmPassword"} label={"Confirmer votre mot de passe"} type="password"
                        icon="password" placeholder={"Confirmer votre mot de passe"}/>
        </div>

        <div className="vstack stack-vend">
            {error && <p className="text-danger">{error}</p>}
        </div>
        <div className="hstack stack-center mt-5">
            <Link to="/login" className="btn btn-secondary">Connection</Link>
            <button className="btn btn-primary" type="submit">S'inscrire</button>
        </div>
    </form>
}

export default Register;