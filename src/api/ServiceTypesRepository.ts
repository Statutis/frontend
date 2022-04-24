import axios from "axios";
import ServiceType from "./Models/Service/ServiceType";

const serialization = (data:ServiceType):ServiceType=>{
    const s = new ServiceType()
    s.name = data.name
    s.ref = data.ref
    return s;
}

export async function getServiceTypes(): Promise<ServiceType[]> {

    const response = await axios.get<ServiceType[]>("/api/services/types")

    return response.data.map(serialization);
}

export async function getServiceTypeByRef(ref:string) : Promise<ServiceType> {
    const res = await axios.get<ServiceType>(ref);
    return serialization(res.data);
}
