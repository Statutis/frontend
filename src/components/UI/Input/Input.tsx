import React, {DetailedHTMLProps} from "react";
import PropTypes from "prop-types";

export interface InputProps extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    icon?: string | undefined;
}


const Input = function ({icon = undefined, ...props}: InputProps) {

    return <div className="app-input">
        <span className={"material-icons"}>{icon ?? "style"}</span>
        <input {...(props)}/>
    </div>
}

export default Input;


Input.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    icon: PropTypes.string,
    placeholder: PropTypes.string,
}