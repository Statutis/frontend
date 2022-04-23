import React, {useEffect, useState} from "react";
import axios from "axios";

interface ImageLoaderProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    alt: string;
    src: string;
}


const ImageLoader = ({alt, src, ...props}: ImageLoaderProps) => {

    const [imgData, setImgData] = useState("");

    useEffect(() => {
        axios.get(src, {responseType: "blob"}).then(resp => {
            const reader = new window.FileReader();
            reader.readAsDataURL(resp.data);
            reader.onload = function () {
                setImgData(reader.result?.toString() ?? "")
            }
        })
    }, [src])

    return <img  {...props} src={imgData} alt={alt}/>
}

export default ImageLoader;
