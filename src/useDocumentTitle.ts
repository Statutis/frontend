import {useRef, useEffect, useContext} from 'react'
import {AppContext} from "./AppProvider";


function useDocumentTitle(title: string, prevailOnUnmount = false) {
    const defaultTitle = useRef(document.title);
    const {setPageTitle} = useContext(AppContext);

    useEffect(() => {
        document.title = title;
        setPageTitle(title)
    }, [title]);

    useEffect(() => () => {
        if (!prevailOnUnmount) {
            document.title = defaultTitle.current;
        }
    }, [])
}

export default useDocumentTitle