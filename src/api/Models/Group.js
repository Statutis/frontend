export default class Group {
    ref = "";
    mainGroupRef = "";
    name = undefined;
    description = undefined;
    lastCheck = new Date()
    services = []

    constructor() {
    }


    onlineServices() {
        return this.services.filter(x => x.state.toLowerCase() == "online")
    }

    isInFilter(text, serviceType = undefined, team = undefined, checkType = undefined, isPublic = true, hideFullOnline = false) {
        if (text !== undefined && text.trim() != "") {
            if (!this.name.toLowerCase().includes(text.toLowerCase()) && !this.description.toLowerCase().includes(text.toLowerCase()))
                return false;
        }

        //TODO Filtre par type de service (serviceType)
        //TODO Filtre par visibilité (isPublic)
        //TODO Filtre par checkType

        if (hideFullOnline === true && this.onlineServices().length === this.services.length)
            return false

        return true;
    }
}

export class GroupService {
    ref = "";
    state = ""
    lastCheck = new Date()
}
