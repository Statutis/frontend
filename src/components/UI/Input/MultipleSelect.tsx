import React, {createRef, useCallback, useEffect, useState} from "react";
import Badge from "../Badge";

type Allowed = string | number;

type BaseProps<Value> = {
    value?: Value[] | undefined;
    options: readonly Value[]
    onChange?: ((newValue: Value[] | undefined) => void);

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

function MultiSelect<Value>({
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
    const inputRef = createRef<HTMLInputElement>()

    const [selectValue, setSelectValue] = useState<Value[]>([])
    const [inputSelect, setInputSelect] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false)


    useEffect(() => {
        setSelectValue(value ?? [])
    }, [value])


    const updateValue = (value: Value) => {

        let values;
        if (selectValue.map(toValue).includes(toValue(value)))
            values = selectValue.filter(x => toValue(x) != toValue(value))
        else
            values = selectValue.concat(value)

        setSelectValue(values)

        setInputSelect("")

        if (onChange !== undefined) {
            onChange(values)
        }
    }
    const updateInputSelect = (value: React.SyntheticEvent<HTMLInputElement>) => {
        if (!isOpen)
            return
        setInputSelect(value.currentTarget.value)
    }

    const open = () => {
        setIsOpen(true)
        setInputSelect("")
        inputRef.current?.focus();
    }

    const close = () => {
        setIsOpen(false)
        if (selectValue !== undefined)
            setInputSelect("")
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


    const isSelect = (value: Value): boolean => {
        return selectValue.map(toValue).includes(toValue(value))
    }

    return <div className={"app-selector" + (isOpen ? ' app-selector-open' : '')}
                ref={containerRef}>
        <div className={"app-selector-header"}>
            <span className={"material-icons"}>{icon ?? "style"}</span>
            <div className={"select-value"} onFocus={open} onClick={open}>
                {selectValue.map(x =>
                    <Badge customClass={"badge-reverse"} color={"grey"} key={toValue(x)} value={toLabel(x)}/>
                )}
                <input type="text" ref={inputRef}
                       placeholder={placeholder ?? "Choisissez une valeur"}
                       value={inputSelect} onChange={updateInputSelect}
                       onFocus={open}
                />
            </div>


            <span className={"material-icons"}
                  onClick={isOpen ? close : open}>{isOpen ? "expand_less" : "expand_more"}</span>
        </div>
        <ul>
            {filterValues(inputSelect).map(x => {
                return <li key={toValue(x)} className={(isSelect(x) ? "select" : "")}
                           onClick={() => updateValue(x)}>{toLabel(x)}</li>
            })}

        </ul>
    </div>
}

export default MultiSelect;