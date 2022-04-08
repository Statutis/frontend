import { useState, useEffect } from "react";

const Input = function(props){

    const [value, setValue] = useState("")

    const updateValue = value => {
        setValue(value.target.value)
        if (props.hasOwnProperty("onChange"))
            props.onChange(value.target.value)
    }

    useEffect(()=>{
        setValue(props.value ?? "")
    }, [props.value])

    return <div className="app-input">
        <span className={"material-icons"}>{props.icon ?? "style"}</span>
        <input type="text" placeholder={props.placeholder ?? ""} value={value} onChange={updateValue}/>
    </div>
}

export default Input;