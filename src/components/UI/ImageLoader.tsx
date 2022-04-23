import React, {useEffect, useState} from "react";
import axios from "axios";

interface ImageLoaderProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    alt: string;
    src: string;
}


const ImageLoader = ({alt, src, ...props}: ImageLoaderProps) => {

    const [imgData, setImgData] = useState("");

    useEffect(() => {
        axios.get(src, {responseType: "blob"}).then(async resp => {
            const result_base64: string | undefined = await new Promise((resolve) => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result as string | undefined);
                fileReader.readAsDataURL(resp.data);
            });
            setImgData(result_base64 ?? "")
        })
    }, [src])

    return <img  {...props} src={imgData} alt={alt}/>
}

export default ImageLoader;
