import {ServiceState} from "../Service/Service";

export class HistoryEntry {

    serviceId: number;
    dateTime : Date;
    state: ServiceState;
    message: string | undefined;
    serviceRef: string;

    constructor() {
        this.serviceId = 0;
        this.dateTime = new Date();
        this.serviceRef = "";
        this.state = ServiceState.Unknown;
    }

}
