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
    isPublic: boolean;
    state: ServiceState;
    lastCheck: Date;
    historyRef: string;

    constructor() {
        this.ref = undefined;
        this.serviceTypeRef = "";
        this.historyRef = "";
        this.checkType = "Unknown";
        this.name = "???";
        this.host = "???";
        this.description = undefined;
        this.isPublic = true;
        this.state = ServiceState.Unknown;
        this.lastCheck = new Date()
    }
}
