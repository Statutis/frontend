export enum ServiceState {
    Online = "Online",
    Unknown = "Unknown",
    Unreachable = "Unreachable",
    Error = "Error",
}


export class Service {

    ref: string | undefined;
    serviceTypeRef: string;
    checkType: string;
    name: string;
    description: string | undefined;
    host: string;
    state: ServiceState;
    lastCheck: Date;
    historyRef: string;
    groupRef: string|undefined;
    detailRef: string;

    constructor() {
        this.ref = undefined;
        this.serviceTypeRef = "";
        this.historyRef = "";
        this.checkType = "Unknown";
        this.name = "???";
        this.host = "???";
        this.description = undefined;
        this.state = ServiceState.Unknown;
        this.lastCheck = new Date()
        this.groupRef = undefined;
        this.detailRef = "";
    }

    getId() {
        return this.ref?.split('/').reverse()[0];
    }

    getGroupId() {
        return this.groupRef?.split('/').reverse()[0];
    }
}
