import axios from "axios";
import Group from "./Models/Group";
import {Service} from "./Models/Service/Service";

export async function getGroups(): Promise<Group[]> {
    const response = await axios.get<Group[]>("/api/groups")
    return response.data.map(x => {
        const g = new Group();
        g.ref = x.ref
        g.name = x.name
        g.description = x.description
        g.isPublic = x.isPublic;
        g.lastCheck = new Date(x.lastCheck)
        g.services = x.services.map(y => {
            const s = new Service()
            s.ref = y.ref;
            s.serviceTypeRef = y.serviceTypeRef;
            s.checkType = y.checkType;
            s.name = y.name;
            s.description = y.description;
            s.host = y.host;
            s.state = y.state;
            s.lastCheck = new Date(y.lastCheck);
            return s;
        })

        g.teamsRef = x.teamsRef;
        return g
    })
}