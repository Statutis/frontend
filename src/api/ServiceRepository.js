import axios from "axios";

export class MainState {
    lastUpdate = new Date()
    state = "Unknown"
}

export async function GetMainState() {
    const response = await axios.get("/api/services/state")
    let state = new MainState()

    state.lastUpdate = new Date(response.data.lastUpdate)
    state.state = response.data.state

    return state;
}