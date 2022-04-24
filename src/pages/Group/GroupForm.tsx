import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import useDocumentTitle from "../../useDocumentTitle";
import {add, getGroup, update} from "../../api/GroupRepository";
import {useFormik} from "formik";
import FieldInput from "../../components/UI/Input/FieldInput";
import Switch from "../../components/UI/Input/Switch";
import Team from "../../api/Models/Team";
import {getTeams, getTeamsByRef} from "../../api/TeamRepository";
import MultipleSelect from "../../components/UI/Input/MultipleSelect";
import * as Yup from 'yup'
import Group from "../../api/Models/Group";

interface GroupForm {
    name: string;
    isPublic: boolean;
    description: string | undefined;
    teams: Array<Team>;
    // teamsRef: string[] = []
}

const GroupForm = () => {

    const [teams, setTeams] = useState<Team[]>([])
    const [group, setGroup] = useState<Group>(new Group())

    const navigate = useNavigate();

    useEffect(() => {
        getTeams().then(setTeams)
    }, [])

    const id = useParams<"id">().id;
    const addMode = id === undefined

    if (addMode)
        useDocumentTitle("Ajout d'un nouveau groupe")
    else
        useDocumentTitle("Edition d'un groupe")

    const form = useFormik<GroupForm>({
        initialValues: {
            name: "",
            isPublic: true,
            description: "",
            teams: [],
        },
        validationSchema: Yup.object({
            teams: Yup.array()
                .min(1, "Vous devez sélectionner au mois une équipe.")
                .required("Ce champs est requis."),
            name: Yup.string()
                .min(3, 'Doit être faire au moins 3 caractères.')
                .required("Ce champs est requis."),
        }),
        onSubmit: async values => {
            try {
                let clone: Group
                if (addMode) {
                    clone = new Group();
                } else {
                    clone = Object.assign(Object.create(Object.getPrototypeOf(group)), group)
                }
                clone.name = values.name
                clone.description = values.description
                clone.isPublic = values.isPublic
                clone.teamsRef = values.teams.map(x => x.ref ?? "")

                const res: Group = addMode ? await add(clone) : await update(clone);
                setGroup(res)
                navigate("/groups/" + res.id)
            } catch (e) {
                //     setError("Impossible de mettre à jour l'utilisateur !")
            }
        }
    })

    useEffect(() => {
        if (addMode) {
            // form.setValues(new Group())
        } else {
            getGroup(id).then(x => {
                setGroup(x)

                form.setValues({
                    name: x.name,
                    isPublic: x.isPublic,
                    description: x.description,
                    teams: [],
                })

                Promise.all(x.teamsRef.map(x => getTeamsByRef(x))).then(x => {
                    form.setFieldValue("teams", x)
                })


            });
        }
    }, [id])


    return <div className="content">
        <form className="" onSubmit={form.handleSubmit}>
            <FieldInput formik={form} field="name" label="Titre du groupe" placeholder="Titre du groupe" type="text"
                        icon="sell"/>

            <div className="form-group">
                <label htmlFor="description">Description :</label>
                <textarea id="description" value={form.values.description} onChange={form.handleChange}/>
                {form.errors.description ? <p className="text-danger">{form.errors.description}</p> : null}
            </div>


            <div className="form-group">
                <label>Equipes :</label>
                <MultipleSelect options={teams} value={form.values.teams} mapOptionToValue={x => x.ref ?? ""}
                                placeholder={"Choisissez au moins une équipe"}
                                mapOptionToLabel={x => x.name} onChange={x => form.setFieldValue("teams", x)}/>
                {form.errors.teams ? <p className="text-danger">{form.errors.teams.toString()}</p> : null}
            </div>

            <Switch label={"Rendre le groupe accessible (en lecture seulement) à tous"} value={form.values.isPublic}
                    onChange={x => form.setFieldValue("isPublic", x)}/>


            <div className="vstack stack-vend">
                {/*{error && <p className="text-danger">{error}</p>}*/}
            </div>
            <div className="hstack stack-end mt-5">
                <Link to={addMode ? "/search" : "/groups/" + id} className="btn btn-red">
                    <span className="material-icons">cancel</span>&nbsp;
                    Annuler
                </Link>
                <button className="btn btn-primary">
                    <span className="material-icons">save</span>&nbsp;
                    Enregistrer
                </button>
            </div>
        </form>
    </div>
}

export default GroupForm