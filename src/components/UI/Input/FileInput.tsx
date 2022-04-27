import React, {createRef, LegacyRef, SyntheticEvent} from "react";


interface FileInputProps {
    onFileChange: (file: File | undefined) => void
    contentTypes?: string[] | undefined,
    children: JSX.Element|JSX.Element[]
}

const FileInput = ({onFileChange, contentTypes = undefined, children}: FileInputProps) => {
    const inputFileRef: LegacyRef<HTMLInputElement> = createRef()

    const fileChange = (event: SyntheticEvent<HTMLInputElement>) => {
        event.stopPropagation()
        event.preventDefault()

        const files = event.currentTarget.files ?? [];

        if (files.length > 0 && (!contentTypes || contentTypes.includes(files[0].type)))
            onFileChange(files[0])
        else
            onFileChange(undefined)
    }

    return <>
        <input type="file" hidden style={{display: "none"}} ref={inputFileRef} onChange={fileChange}/>
        <button className="btn" onClick={() => inputFileRef?.current?.click()}>
            {children}
        </button>
    </>
}

export default FileInput