import axios from "axios";
import {Service, ServiceState} from "./Models/Service/Service";
import DnsService from "./Models/Service/DnsService";
import HttpService from "./Models/Service/HttpService";
import PingService from "./Models/Service/PingService";
import AtlassianStatusPageService from "./Models/Service/AtlassianStatusPageService";

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

export async function getServiceByGuid(id:string) : Promise<Service> {
    const response = await axios.get<Service>(`/api/services/${id}`);
    const service:Service = new Service();
    service.serviceTypeRef = response.data.serviceTypeRef;
    service.groupRef = response.data.groupRef;
    service.ref = response.data.ref;
    service.name = response.data.name;
    service.host = response.data.host;
    service.description = response.data.description;
    service.state = response.data.state;
    service.lastCheck = response.data.lastCheck;
    service.checkType = response.data.checkType;
    service.historyRef = response.data.historyRef;
    service.detailRef = response.data.detailRef
    return service;
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


export async function removeService(guid:string):Promise<void>{
    const response = await axios.delete<void>(`/api/services/${guid}`);
    return response.data;
}

export async function getDns(ref:string) : Promise<DnsService>{
    const response = await axios.get<DnsService>(ref);
    return response.data;
}

export async function getHttp(ref:string) : Promise<HttpService>{
    const response = await axios.get<HttpService>(ref);
    return response.data;
}

export async function getPing(ref:string) : Promise<PingService>{
    const response = await axios.get<PingService>(ref);
    return response.data;
}

export async function getAtlassianStatusPage(ref:string) : Promise<AtlassianStatusPageService>{
    const response = await axios.get<AtlassianStatusPageService>(ref);
    return response.data;
}

export async function updateDns(url:string, service: DnsService): Promise<DnsService> {
    const response = await axios.put<DnsService>(url, {
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

export async function updateHttp(url:string, data: HttpService): Promise<HttpService> {
    const response = await axios.put<HttpService>(url, {
        Name: data.name,
        GroupRef: data.groupRef,
        Description: data.description,
        Host: data.host,
        ServiceTypeRef: data.serviceTypeRef,
        port: data.port,
        code: data.code,
        redirectUrl: data.redirectUrl

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

export async function updatePing(url:string, form: PingService): Promise<PingService> {

    const response = await axios.put<PingService>(url, {
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
