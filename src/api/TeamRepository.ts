import axios from "axios";
import Team from "./Models/Team";

const serialize = (data: Team): Team => {
    const s = new Team()
    s.id = data.id
    s.name = data.name
    s.color = data.color
    s.ref = data.ref
    s.groupRef = data.groupRef
    s.userRef = data.userRef
    s.avatarRef = data.avatarRef
    return s;
}

export async function getTeams(): Promise<Team[]> {
    const response = await axios.get<Team[]>("/api/teams")
    return response.data.map(serialize);
}

export async function getTeamsByRef(ref: string): Promise<Team> {
    const res = await axios.get<Team>(ref);
    return serialize(res.data);
}

export function getTeam(guid: string): Promise<Team> {
    return getTeamsByRef(`/api/teams/${guid}`)
}

export async function update(group: Team): Promise<Team> {
    const response = await axios.put<Team>(group.ref ?? "", {
        "name": group.name,
        "color": group.color,
        "users": group.userRef,
    });
    return serialize(response.data)

}


export async function add(group: Team): Promise<Team> {
    const response = await axios.post<Team>("/api/teams", {
        "name": group.name,
        "color": group.color,
        "users": group.userRef,
    });
    return serialize(response.data)

}

export function remove(group: Team): Promise<void> {
    return axios.delete(group.ref ?? "");
}

export async function updateAvatar(file: File | undefined, team: Team): Promise<void> {
    const formData = new FormData();
    if (file)
        formData.append("form", file);

    await axios.put(team.avatarRef ?? `api/teams/avatar/${team.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}