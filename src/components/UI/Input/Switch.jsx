import {useEffect, useRef, useState} from "react";
import _uniqueId from "../../../Utils/IdGenerator";

const Switch = function (props) {

    const {current: inputId} = useRef(_uniqueId("switch"));

    const [value, setValue] = useState("")

    const updateValue = _ => {
        const new_value = !value
        setValue(new_value)
        if (props.hasOwnProperty("onChange"))
            props.onChange(new_value)
    }

    useEffect(() => {
        setValue(props.value ?? false)
    }, [props.value])

    return <div className={"app-switch " + (props.className ?? "")}>
        <input type="checkbox" checked={value} onChange={updateValue} id={inputId}/>
        <label htmlFor={inputId}>
            <div className="switch"/>
            <span>{props.label ?? ""}</span>
        </label>
    </div>
}

export default Switch;