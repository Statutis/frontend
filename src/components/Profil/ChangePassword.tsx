import React, {useState} from "react";
import User from "../../api/Models/User";
import {useFormik} from "formik";
import * as Yup from "yup";
import FieldInput from "../UI/Input/FieldInput";
import UserService from "../../Services/UserService";

interface ChangePasswordProps {
    user: User,
    onChange?: (user: User) => void | undefined
}

interface PasswordForm {
    password: string
    confirmPassword: string
}

const ChangePassword = ({user, onChange}: ChangePasswordProps) => {

    const [error, setError] = useState<string | undefined>(undefined)

    const form = useFormik<PasswordForm>({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, "Doit être faire au moins 8 caractères.")
                .required("Ce champs est requis."),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Les mots de passes ne correspondent pas.")
                .required("Ce champs est requis.")
        }),
        onSubmit: async values => {
            try {
                setError(undefined)
                await UserService.updatePassword(values.password, user)
                if (onChange)
                    onChange(user)
            } catch (e) {
                setError("Impossible de mettre à jour l'utilisateur !")
            }
        }
    })

    return <form className="" onSubmit={form.handleSubmit}>


        <div className="grid2">
            <FieldInput formik={form} field={"password"} label={"Mot de passe"} placeholder={"Mot de passe"}
                        icon="password" type="password"/>
            <FieldInput formik={form} field={"confirmPassword"} label={"Confirmer votre mot de passe"} icon="password"
                        placeholder={"Confirmer votre mot de passe"} type="password"/>
        </div>


        <div className="vstack stack-vend">
            {error && <p className="text-danger">{error}</p>}
        </div>
        <div className="hstack stack-end mt-5">
            <button className="btn btn-primary">
                <span className="material-icons">save</span>&nbsp;
                Enregistrer
            </button>
        </div>
    </form>
}

export default ChangePassword