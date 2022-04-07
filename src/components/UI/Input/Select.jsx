import {useCallback, useEffect, useRef, useState} from "react";

function Select(props) {

    const containerRef = useRef()

    const [selectValue, setSelectValue] = useState(undefined)
    const [inputSelect, setInputSelect] = useState("")
    const [isOpen, setIsOpen] = useState(false)


    const updateValue = value => {
        setSelectValue(value)
        setIsOpen(false)
        setInputSelect(value.label)
    }
    const updateInputSelect = value => {
        if (!isOpen)
            return
        setInputSelect(value.target.value)
    }

    const open = _ => {
        setIsOpen(true)
        setInputSelect("")
    }

    const close = _ => {
        setIsOpen(false)
        setInputSelect(selectValue?.label)
    }

    const filterValues = useCallback((filter) => {
        let values = props.values ?? []
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
            <span className={"material-icons"}>{props.icon ?? "style"}</span>
            <input type="text"
                   placeholder={props.placeholder ?? "Choisissez une valeur"}
                   value={inputSelect} onChange={updateInputSelect}
                   onFocus={open}
            />

            <span className={"material-icons"}>expand_more</span>
        </div>
        <ul>
            {filterValues(inputSelect).map(x => {
                return <li key={x.id} onClick={_ => updateValue(x)}>{x.label}</li>
            })}
        </ul>
    </div>
}

export default Select;