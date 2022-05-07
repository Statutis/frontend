import React, {createRef} from "react";
import {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";

type Allowed = string | number;

type BaseProps<Value> = {
    value?: Value | undefined;
    options: readonly Value[]
    onChange?: ((newValue: Value | undefined) => void);

    icon?: string
    placeholder?: string

    mapOptionToLabel?: (option: Value) => Allowed;
    mapOptionToValue?: (option: Value) => Allowed;
};

// type Props<Value> = Value extends Allowed
//     ? BaseProps<Value>
//     : Required<BaseProps<Value>>;

const isAllowed = (v: unknown): v is Allowed =>
    typeof v === "string" || typeof v === "number";

function Select<Value>({
                           value = undefined,
                           onChange = undefined,
                           options = [],
                           icon = undefined,
                           placeholder = undefined,
                           mapOptionToLabel = undefined,
                           mapOptionToValue = undefined,
                       }: BaseProps<Value>) {

    const toLabel = (option: Value): string => {
        if (mapOptionToLabel) {
            return mapOptionToLabel(option).toString();
        }
        // if our props are provided correctly, this should never be false
        return isAllowed(option) ? option.toString() : String(option);
    };

    const toValue = (option: Value): Allowed => {
        if (mapOptionToValue) {
            return mapOptionToValue(option);
        }
        return isAllowed(option) ? option : String(option);
    };

    const containerRef = createRef<HTMLDivElement>()

    const [selectValue, setSelectValue] = useState<Value | undefined>(undefined)
    const [inputSelect, setInputSelect] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false)


    useEffect(() => {
        setSelectValue(value)
        setInputSelect(value != undefined ? toLabel(value) : "");
    }, [value])


    const updateValue = (value: Value | undefined) => {
        setSelectValue(value)
        setIsOpen(false)
        if (value)
            setInputSelect(toLabel(value))
        else
            setInputSelect("")
        if (onChange !== undefined)
            onChange(value)
    }
    const updateInputSelect = (value: React.SyntheticEvent<HTMLInputElement>) => {
        if (!isOpen)
            return
        setInputSelect(value.currentTarget.value)
    }

    const open = () => {
        setIsOpen(true)
        setInputSelect("")
    }

    const close = () => {
        setIsOpen(false)
        if (selectValue !== undefined)
            setInputSelect(toLabel(selectValue))
    }

    const filterValues = useCallback((filter: string) => {
        return options.filter(x => toLabel(x).toString().toLowerCase().includes(filter?.toLowerCase()));
    }, [options])


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && event.target instanceof Element && !containerRef.current.contains(event.target)) {
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

            <span className={"material-icons"}
                  onClick={isOpen ? close : open}>{isOpen ? "expand_less" : "expand_more"}</span>
        </div>
        <ul>
            <li onClick={() => updateValue(undefined)}></li>
            {filterValues(inputSelect).map(x => {
                return <li key={toValue(x)} onClick={() => updateValue(x)}>{toLabel(x)}</li>
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
    values: PropTypes.arrayOf(PropTypes.object),
    labelField: PropTypes.string,
    refField: PropTypes.string
}
