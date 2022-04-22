import axios from "axios";
import Group from "./Models/Group";
import {Service} from "./Models/Service/Service";

export async function getPublicGroups(): Promise<Group[]> {
    const response = await axios.get<Group[]>("/api/groups/public")
    return response.data.map(x => {
        const g = new Group();
        g.ref = x.ref
        g.mainGroupRef = x.mainGroupRef
        g.name = x.name
        g.description = x.description
        g.lastCheck = new Date(x.lastCheck)
        g.services = x.services.map(y => {
            const s = new Service()
            s.ref = y.ref;
            s.serviceTypeRef = y.serviceTypeRef;
            s.checkType = y.checkType;
            s.name = y.name;
            s.description = y.description;
            s.host = y.host;
            s.isPublic = y.isPublic;
            s.state = y.state;
            s.lastCheck = new Date(y.lastCheck);
            return s;
        })

        g.teamsRef = x.teamsRef;
        return g
    })
}

export async function getGroup(guid:string): Promise<Group> {
    const response = await axios.get<Group>(`/api/groups/${guid}`);
    const g = new Group();
    g.ref = response.data.ref
    g.mainGroupRef = response.data.mainGroupRef
    g.name = response.data.name
    g.description = response.data.description
    g.lastCheck = new Date(response.data.lastCheck)
    g.services = response.data.services.map(y => {
        const s = new Service()
        s.ref = y.ref;
        s.serviceTypeRef = y.serviceTypeRef;
        s.checkType = y.checkType;
        s.name = y.name;
        s.description = y.description;
        s.host = y.host;
        s.isPublic = y.isPublic;
        s.state = y.state;
        s.lastCheck = new Date(y.lastCheck);
        s.historyRef = y.historyRef
        return s;
    })

    g.teamsRef = response.data.teamsRef;
    return g

}
