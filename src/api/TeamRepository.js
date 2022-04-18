import axios from "axios";
import Team from "./Models/Team";

export async function getTeams() {

    const response = await axios.get("/api/team")

    return response.data.map(x => {
        let s = new Team()
        s.name = x.name
        s.color = x.color
        s.ref = x.ref
        s.mainTeamRef = x.mainTeamRef
        return s;
    });
}