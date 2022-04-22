import Input, {InputProps} from "./Input";
import React from "react";
import {FormikErrors, FormikValues} from "formik/dist/types";

interface FormikProps<Values extends FormikValues = FormikValues> {
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
    handleChange: {
        (e: React.ChangeEvent<unknown>): void;
        <T_1 = string | React.ChangeEvent<unknown>>(field: T_1): T_1 extends React.ChangeEvent<unknown> ? void : (e: string | React.ChangeEvent<unknown>) => void;
    };
    errors: FormikErrors<Values>;
    values: Values;
}

interface FieldInputProps<Values extends FormikValues = FormikValues> extends InputProps {
    formik: FormikProps<Values>
    field: keyof Values & keyof FormikErrors<Values> & string
    label: string
}

function FieldInput<Values extends FormikValues = FormikValues>(props: FieldInputProps<Values>) {
    return <div className="form-group">
        <label htmlFor={props.field}>{props.label} :</label>
        <Input {...props} id={props.field}
               value={props.formik.values[props.field]} onChange={props.formik.handleChange}/>
        {props.formik.errors[props.field] ?
            <p className="text-danger">{props.formik.errors[props.field]?.toString() ?? ""}</p> : null}
    </div>
}

export default FieldInput;