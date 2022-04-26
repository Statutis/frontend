import { Service } from "./Service";

export default class DnsService extends Service {

    type: string;
    result: string;

    constructor() {
        super();
        this.type = "";
        this.result = "";
    }


}
