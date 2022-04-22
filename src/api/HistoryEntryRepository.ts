import axios from "axios";
import {HistoryEntry} from "./Models/History/HistoryEntry";

export async function getHistoryByRef(ref: string) : Promise<HistoryEntry[]> {

    const res = await axios.get<HistoryEntry[]>(ref);
    return res.data;

}
