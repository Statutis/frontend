import axios from "axios";
import ServiceType from "./Models/Service/ServiceType";

export async function getServiceTypes() {

    const response = await axios.get("/services/types")

    return response.data.map(x => {
        let s = new ServiceType()
        s.name = x.name
        s.ref = x.ref
        return s;
    });
}