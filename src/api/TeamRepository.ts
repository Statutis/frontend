import axios from "axios";
import Team from "./Models/Team";

export async function getTeams(): Promise<Team[]> {
    const response = await axios.get<Team[]>("/api/team")
    return response.data.map(x => {
        const s = new Team()
        s.name = x.name
        s.color = x.color
        s.ref = x.ref
        s.groupRef = x.groupRef
        s.userRef = x.userRef
        return s;
    });
}

export async function getTeamsByRef(ref: string): Promise<Team> {
    const res = await axios.get<Team>(ref);

    const s = new Team()
    s.name = res.data.name
    s.color = res.data.color
    s.ref = res.data.ref
    s.groupRef = res.data.groupRef
    s.userRef = res.data.userRef
    return s;
}
