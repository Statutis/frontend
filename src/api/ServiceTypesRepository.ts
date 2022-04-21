import axios from "axios";
import ServiceType from "./Models/Service/ServiceType";

export async function getServiceTypes(): Promise<ServiceType[]> {

    const response = await axios.get<ServiceType[]>("/api/services/types")

    return response.data.map(x => {
        const s = new ServiceType()
        s.name = x.name
        s.ref = x.ref
        return s;
    });
}

export async function getServiceTypesByRef(ref:string) : Promise<ServiceType> {
    const res = await axios.get<ServiceType>(ref);
    return res.data;
}
