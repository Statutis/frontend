import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import User from "../../api/Models/User";
import Team from "../../api/Models/Team";
import useDocumentTitle from "../../useDocumentTitle";
import {useFormik} from "formik";
import * as Yup from "yup";
import Error from "../Error";
import {add, getTeam, update} from "../../api/TeamRepository";
import {getUserByRef, getUsers} from "../../api/UserRepository";
import FieldInput from "../../components/UI/Input/FieldInput";
import MultipleSelect from "../../components/UI/Input/MultipleSelect";

interface TeamForm {
    name: string
    color: string | undefined
    users: User[]
}

const TeamForm = () => {
    const navigate = useNavigate();

    const id = useParams<"id">().id;
    const addMode = id === undefined

    const [users, setUsers] = useState<User[]>([])
    const [team, setTeam] = useState<Team | undefined | false>(addMode ? new Team() : undefined)

    if (addMode)
        useDocumentTitle("Ajout d'une nouvelle équipe")
    else
        useDocumentTitle("Edition d'une équipe")

    const form = useFormik<TeamForm>({
        initialValues: {
            name: "",
            color: "",
            users: [],
        },
        validationSchema: Yup.object({
            users: Yup.array()
                .min(1, "Vous devez sélectionner au mois un utilisateur.")
                .required("Ce champs est requis."),
            name: Yup.string()
                .min(3, 'Doit être faire au moins 3 caractères.')
                .required("Ce champs est requis."),
            color: Yup.string(),
        }),
        onSubmit: async values => {
            try {
                let clone: Team
                if (addMode) {
                    clone = new Team();
                } else {
                    clone = Object.assign(Object.create(Object.getPrototypeOf(team)), team)
                }
                clone.name = values.name
                clone.color = values.color == "" ? undefined : values.color
                clone.userRef = values.users.map(x => x.ref ?? "")

                console.log(clone.userRef)
                const res: Team = addMode ? await add(clone) : await update(clone);
                setTeam(res)
                navigate("/teams/" + res.id)
            } catch (e) {
                //     setError("Impossible de mettre à jour l'utilisateur !")
            }
        }
    })

    useEffect(() => {
        getUsers().then(setUsers)
    }, [])

    useEffect(() => {
        if (addMode) {
            // form.setValues(new Group())
        } else {
            getTeam(id).then(x => {
                setTeam(x)

                form.setValues({
                    name: x.name,
                    color: x.color,
                    users: [],
                })

                Promise.all(x.userRef.map(x => getUserByRef(x))).then(x => {
                    form.setFieldValue("users", x)
                })


            }).catch(() => setTeam(false));
        }
    }, [id])

    if (team === undefined)
        return <div className={"fluid-content hstack stack-center"}>
            <p>Chargement en cours ....</p>
        </div>


    if (team === false)
        return <Error code={404}/>


    return <div className="content">
        <form onSubmit={form.handleSubmit}>
            <FieldInput formik={form} field="name" label="Titre de l'équipe" placeholder="Titre de l'équipe" type="text"
                        icon="sell"/>
            <FieldInput formik={form} field="color" label="Couleur de l'équipe" placeholder="Couleur de l'équipe"
                        type="text"
                        icon="palette"/>

            <div className="form-group">
                <label>Utilisateurs :</label>
                <MultipleSelect options={users} value={form.values.users} mapOptionToValue={x => x.ref ?? ""}
                                placeholder={"Choisissez au moins une équipe"}
                                mapOptionToLabel={x => x.completeName() ?? ""} onChange={x => form.setFieldValue("users", x)}/>

                {form.errors.users ? <p className="text-danger">{form.errors.users.toString()}</p> : null}
            </div>

            <div className="hstack stack-end mt-5">
                <Link to={addMode ? "/teams" : "/teams/" + id} className="btn btn-red">
                    <span className="material-icons">cancel</span>&nbsp;
                    Annuler
                </Link>
                <button className="btn btn-primary" type="submit">
                    <span className="material-icons">save</span>&nbsp;
                    Enregistrer
                </button>
            </div>


        </form>
    </div>
}

export default TeamForm