import axios from "axios";
import {ServiceState} from "./Models/Service/Service";

export class MainState {
    lastUpdate: Date = new Date();
    state: ServiceState = ServiceState.Unknown;
}

export async function getMainState(): Promise<MainState> {
    const response = await axios.get<MainState>("/api/services/state")
    const state = new MainState()

    state.lastUpdate = new Date(response.data.lastUpdate)
    state.state = response.data.state

    return state;
}

export async function getCheckTypes() : Promise<string[]> {
    const response = await axios.get<string[]>("/api/services/checks")
    return response.data;
}