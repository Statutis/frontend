import React from "react";
import {useState, useEffect} from "react";
import PropTypes from "prop-types";

const Input = function ({onChange = undefined, value = undefined, icon = undefined, placeholder = undefined}) {

    const [stateValue, setValue] = useState("")

    const updateValue = value => {
        setValue(value.target.value)
        if (onChange !== undefined)
            onChange(value.target.value)
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
    placeholder : PropTypes.string,
}