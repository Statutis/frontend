import React from "react";
import {useCallback, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";

function Select({value = undefined, onChange = undefined, values = [], icon = undefined, placeholder = undefined}) {

    const containerRef = useRef()

    const [selectValue, setSelectValue] = useState(undefined)
    const [inputSelect, setInputSelect] = useState("")
    const [isOpen, setIsOpen] = useState(false)


    useEffect(() => {
        setSelectValue(value ?? undefined)
    }, [value])


    const updateValue = value => {
        setSelectValue(value)
        setIsOpen(false)
        setInputSelect(value.label)
        if (onChange !== undefined)
            onChange(value)
    }
    const updateInputSelect = value => {
        if (!isOpen)
            return
        setInputSelect(value.target.value)
    }

    const open = () => {
        setIsOpen(true)
        setInputSelect("")
    }

    const close = () => {
        setIsOpen(false)
        setInputSelect(selectValue?.label)
    }

    const filterValues = useCallback((filter) => {
        return values.filter(x => x.label.toLowerCase().includes(filter?.toLowerCase()));
    })


    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                if (isOpen)
                    close()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [containerRef, close, isOpen])


    return <div className={"app-selector" + (isOpen ? ' app-selector-open' : '')}
                ref={containerRef}>
        <div className={"app-selector-header"}>
            <span className={"material-icons"}>{icon ?? "style"}</span>
            <input type="text"
                   placeholder={placeholder ?? "Choisissez une valeur"}
                   value={inputSelect} onChange={updateInputSelect}
                   onFocus={open}
            />

            <span className={"material-icons"} onClick={isOpen ? close : open}>{isOpen ? "expand_less" : "expand_more"}</span>
        </div>
        <ul>
            {filterValues(inputSelect).map(x => {
                return <li key={x.id} onClick={() => updateValue(x)}>{x.label}</li>
            })}
        </ul>
    </div>
}

export default Select;

Select.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.object)
}