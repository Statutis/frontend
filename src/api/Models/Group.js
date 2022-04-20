export default class Group {
    ref = "";
    mainGroupRef = "";
    name = undefined;
    description = undefined;
    lastCheck = new Date()
    services = []

    constructor() {
    }


    onlineServices(){
        return this.services.filter(x => x.state = "Online")
    }
}

export class GroupService {
    ref = "";
    state = ""
    lastCheck = new Date()
}
