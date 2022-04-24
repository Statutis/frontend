import React, {useState} from "react";
import User from "../../api/Models/User";
import {useFormik} from "formik";
import * as Yup from "yup";
import FieldInput from "../UI/Input/FieldInput";
import Input from "../UI/Input/Input";
import UserService from "../../Services/UserService";

interface ChangePersonalDataProps {
    user: User,
    onChange?: (user: User) => void | undefined
}

interface PersonalDataForm {
    username: string
    name: string
    firstname: string
}

const minLengthYup = Yup.string()
    .min(3, 'Ce champs doit être composé d\'au moins 3 caractères.')

const ChangePersonalData = ({user, onChange}: ChangePersonalDataProps) => {

    const [error, setError] = useState<string | undefined>(undefined)

    const form = useFormik<PersonalDataForm>({
        initialValues: {
            name: user.name ?? "",
            firstname: user.firstname ?? "",
            username: user.username,
        },
        validationSchema: Yup.object({
            username: minLengthYup
                .required("Ce champs est requis."),
            firstname: minLengthYup,
            name: minLengthYup,
        }),
        onSubmit: async values => {
            try {
                setError(undefined)
                const clone: User = Object.assign(Object.create(Object.getPrototypeOf(user)), user)
                clone.username = values.username
                clone.firstname = values.firstname
                clone.name = values.name
                await UserService.update(clone)
                if (onChange)
                    onChange(clone)
            }catch (e){
                setError("Impossible de mettre à jour l'utilisateur !")
            }
        }
    })

    return <form className="" onSubmit={form.handleSubmit}>
        <div className="form-group">
            <label htmlFor="user-email">Adresse email :</label>
            <Input id="user-email" value={user.email} disabled icon="alternate_email" type="email"/>
        </div>

        <FieldInput formik={form} field="username" label="Nom d'utilisateur" placeholder="Nom d'utilisateur" type="text"
                    icon="person"/>


        <div className="grid2">
            <FieldInput formik={form} field={"firstname"} label={"Prénom"} placeholder="Votre prénom" icon="badge"
                        type="text"/>
            <FieldInput formik={form} field={"name"} label={"Nom"} placeholder="Votre nom" icon="badge"
                        type="text"/>
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

export default ChangePersonalData