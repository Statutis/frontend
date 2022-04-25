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
    return s;
}

export async function getTeams(): Promise<Team[]> {
    const response = await axios.get<Team[]>("/api/team")
    return response.data.map(serialize);
}

export async function getTeamsByRef(ref: string): Promise<Team> {
    const res = await axios.get<Team>(ref);
    return serialize(res.data);
}
