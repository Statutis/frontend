import React from "react";
import {useEffect, useRef, useState} from "react";
import _uniqueId from "../../../Utils/IdGenerator";
import PropTypes from "prop-types";


interface SwitchProps {
    onChange?: ((value: boolean) => void) | undefined
    value?: boolean
    label: string
    className?: string | undefined
}

const Switch = function ({onChange = undefined, value, label, className}: SwitchProps) {

    const {current: inputId} = useRef(_uniqueId("switch"));

    const [stateValue, setStateValue] = useState<boolean>(false)

    const updateValue = () => {
        const new_value = !stateValue
        setStateValue(new_value)
        if (onChange !== undefined)
            onChange(new_value)
    }

    useEffect(() => {
        setStateValue(value ?? false)
    }, [value])

    return <div className={"app-switch " + (className ?? "")}>
        <input type="checkbox" checked={stateValue} onChange={updateValue} id={inputId}/>
        <label htmlFor={inputId}>
            <div className="switch"/>
            <span>{label ?? ""}</span>
        </label>
    </div>
}

export default Switch;

Switch.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    className: PropTypes.string,
    label: PropTypes.string,
}