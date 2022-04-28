import {Service} from "./Service";

export default class HttpService extends Service {

    port:number;
    code:number|null;
    redirectUrl:string|null;

    constructor() {
        super();
        this.port = 0;
        this.code = null;
        this.redirectUrl = null;
    }

}
