import React from "react";
import {useState, useEffect} from "react";
import PropTypes from "prop-types";

interface InputProps {
    onChange?: ((value: string) => void) | undefined;
    value?: string | undefined;
    icon?: string | undefined;
    placeholder?: string | undefined;
}

const Input = function ({
                            onChange = undefined,
                            value = undefined,
                            icon = undefined,
                            placeholder = undefined
                        }: InputProps) {

    const [stateValue, setValue] = useState("")


    const updateValue = (value: React.SyntheticEvent<HTMLInputElement>) => {
        setValue(value.currentTarget.value)
        if (onChange !== undefined)
            onChange(value.currentTarget.value)
    }

    useEffect(() => {
        setValue(value ?? "")
    }, [value])

    return <div className="app-input">
        <span className={"material-icons"}>{icon ?? "style"}</span>
        <input type="text" placeholder={placeholder ?? ""} value={stateValue} onChange={updateValue}/>
    </div>
}

export default Input;


Input.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    icon: PropTypes.string,
    placeholder: PropTypes.string,
}