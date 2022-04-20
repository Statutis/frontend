export default class Group {
    ref = "";
    mainGroupRef = "";
    name = undefined;
    description = undefined;
    lastCheck = new Date()
    services = []
    teamsRef = []

    constructor() {
    }


    onlineServices() {
        return this.services.filter(x => x.state.toLowerCase() == "online")
    }

    isInFilter(text, serviceType = undefined, team = undefined, checkType = undefined, hideIsPublic = true, hideFullOnline = false) {
        if (text !== undefined && text.trim() != "") {
            if (!this.name.toLowerCase().includes(text.toLowerCase()) && !this.description.toLowerCase().includes(text.toLowerCase()))
                return false;
        }

        if (team !== undefined && !this.teamsRef.includes(team))
            return false

        if (serviceType !== undefined && this.services.filter(x => x.serviceTypeRef == serviceType.ref).length === 0)
            return false

        console.log(this.services.map(x=>x.checkType), checkType)
        if (checkType !== undefined && this.services.filter(x => x.checkType.toLowerCase() == checkType?.toLowerCase()).length === 0)
            return false

        if (hideIsPublic === true && this.services.filter(x => x.isPublic).length === this.services.length)
            return false

        if (hideFullOnline === true && this.onlineServices().length === this.services.length)
            return false

        return true;
    }
}

