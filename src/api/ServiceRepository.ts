import axios from "axios";
import {ServiceState} from "./Models/Service/Service";
import DnsService from "./Models/Service/DnsService";
import HttpService from "./Models/Service/HttpService";
import PingService from "./Models/Service/PingService";

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

export async function getCheckTypes(): Promise<string[]> {
    const response = await axios.get<string[]>("/api/services/checks")
    return response.data;
}

export async function addDns(service: DnsService): Promise<DnsService> {
    const response = await axios.post<DnsService>("/api/services/dns", {
        Type: service.type,
        Result: service.result,
        Name: service.name,
        GroupRef: service.groupRef,
        Description: service.description,
        Host: service.host,
        ServiceTypeRef: service.serviceTypeRef
    });

    const resp: DnsService = new DnsService();
    resp.ref = response.data.ref;
    resp.name = response.data.name;
    resp.type = response.data.type;
    resp.host = response.data.host;
    resp.result = response.data.result;
    resp.groupRef = response.data.groupRef;
    resp.serviceTypeRef = response.data.serviceTypeRef;
    resp.description = response.data.description;
    resp.historyRef = response.data.historyRef;
    resp.checkType = response.data.checkType;
    resp.lastCheck = response.data.lastCheck;
    resp.state = response.data.state;

    return resp;
}

export async function addHttp(service: HttpService): Promise<HttpService> {
    const response = await axios.post<HttpService>("/api/services/http", {
        Name: service.name,
        GroupRef: service.groupRef,
        Description: service.description,
        Host: service.host,
        ServiceTypeRef: service.serviceTypeRef,
        port: service.port,
        code: service.code,
        redirectUrl: service.redirectUrl

    });

    const resp: HttpService = new HttpService();
    resp.name = response.data.name;
    resp.groupRef = response.data.groupRef;
    resp.description = response.data.description;
    resp.host = response.data.host;
    resp.serviceTypeRef = response.data.serviceTypeRef;
    resp.port = response.data.port;
    resp.code = response.data.code;
    resp.redirectUrl = response.data.redirectUrl;

    return resp;
}

export default async function addPing(form: PingService): Promise<PingService> {

    const response = await axios.post<PingService>("/api/services/ping", {
        name: form.name,
        groupRef: form.groupRef,
        description: form.description,
        host: form.host,
        serviceTypeRef: form.serviceTypeRef
    });

    const resp:PingService = new PingService();
    resp.name = response.data.name;
    resp.groupRef = response.data.groupRef;
    resp.description = response.data.description;
    resp.host = response.data.host;
    resp.serviceTypeRef = response.data.serviceTypeRef;

    return resp;

}
