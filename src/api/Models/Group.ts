import {Service} from "./Service/Service";
import ServiceType from "./Service/ServiceType";
import Team from "./Team";

export default class Group {
    id: string | undefined = undefined;
    ref: string | undefined = undefined;
    name = "??";
    isPublic = true;
    description: string | undefined = undefined;
    avatarRef: string | undefined = undefined;
    lastCheck: Date = new Date()
    services: Array<Service> = []
    teamsRef: string[] = []

    onlineServices() {
        return this.services.filter(x => x.state.toLowerCase() == "online")
    }

    isInFilter(text: string | undefined, serviceType: ServiceType | undefined = undefined, team: undefined | Team | string = undefined, checkType: string | undefined = undefined, hideIsPublic = false, hideFullOnline = false) {
        if (text !== undefined && text.trim() != "") {
            if (!this.name.toLowerCase().includes(text.toLowerCase()) && (this.description == undefined || !this.description.toLowerCase().includes(text.toLowerCase())))
                return false;
        }


        if (team instanceof Team)
            team = team.ref

        if (team !== undefined) {
            if (!this.teamsRef.includes(team))
                return false
        }

        if (serviceType !== undefined && this.services.filter(x => x.serviceTypeRef == serviceType.ref).length === 0)
            return false

        if (checkType !== undefined && this.services.filter(x => x.checkType.toLowerCase() == checkType?.toLowerCase()).length === 0)
            return false

        if (hideIsPublic && this.isPublic)
            return false

        if (hideFullOnline && this.onlineServices().length === this.services.length)
            return false

        return true;
    }
}

