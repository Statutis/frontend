import axios from "axios";
import Group from "./Models/Group";
import {Service} from "./Models/Service/Service";

function serialize(data: Group): Group {
    const g = new Group();
    g.id = data.id
    g.ref = data.ref
    g.name = data.name
    g.description = data.description
    g.isPublic = data.isPublic;
    g.lastCheck = new Date(data.lastCheck)
    g.services = data.services.map(y => {
        const s = new Service()
        s.ref = y.ref;
        s.serviceTypeRef = y.serviceTypeRef;
        s.checkType = y.checkType;
        s.name = y.name;
        s.description = y.description;
        s.host = y.host;
        s.state = y.state;
        s.lastCheck = new Date(y.lastCheck);
        s.historyRef = y.historyRef;
        return s;
    })


    g.teamsRef = data.teamsRef;
    return g;
}

export async function getGroups(): Promise<Group[]> {
    const response = await axios.get<Group[]>("/api/groups")
    return response.data.map(serialize)
}

export function getGroup(guid: string): Promise<Group> {
    return getGroupByRef(`/api/groups/${guid}`)
}

export async function getGroupByRef(ref: string): Promise<Group> {
    const response = await axios.get<Group>(ref);
    return serialize(response.data)
}

export async function update(group: Group): Promise<Group> {
    const response = await axios.put<Group>(group.ref ?? "", {
        "name": group.name,
        "description": group.description,
        "teams": group.teamsRef,
        "isPublic": group.isPublic
    });
    return serialize(response.data)

}


export async function add(group: Group): Promise<Group> {
    const response = await axios.post<Group>("/api/groups", {
        "name": group.name,
        "description": group.description,
        "teams": group.teamsRef,
        "isPublic": group.isPublic
    });
    return serialize(response.data)

}

export async function remove(group: Group): Promise<void> {
    await axios.delete<void>(group.ref ?? "");
}


