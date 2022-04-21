import axios from "axios";
import Team from "./Models/Team";

export async function getTeams() : Promise<Team[]>{
    const response = await axios.get<Team[]>("/api/team")
    return response.data.map(x => {
        const s = new Team()
        s.name = x.name
        s.color = x.color
        s.ref = x.ref
        s.mainTeamRef = x.mainTeamRef
        return s;
    });
}