import Group from "../api/Models/Group";
import {updateAvatar as repositoryUpdateAvatar} from "../api/GroupRepository";


export enum GroupServiceEvent {
    UpdateAvatar = "UpdateGroupAvatar",

}

export class GroupAvatarUpdateEvent extends Event {
    avatarData: string | undefined
    team: Group

    constructor(avatarData: string | undefined, user: Group, eventInitDict?: EventInit) {
        super(GroupServiceEvent.UpdateAvatar, eventInitDict);
        this.avatarData = avatarData
        this.team = user
    }
}

export interface GroupServiceInterface {
    updateAvatar(file: File, user: Group): Promise<string | undefined | false>
}

class GroupService implements GroupService {
    async updateAvatar(file: File | undefined, group: Group): Promise<string | undefined | false> {
        await repositoryUpdateAvatar(file, group)

        if (!file) {
            document.dispatchEvent(new GroupAvatarUpdateEvent(undefined, group))
            return undefined
        }

        const result_base64: string | undefined = await new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result as string | undefined);
            fileReader.readAsDataURL(file);
        });
        document.dispatchEvent(new GroupAvatarUpdateEvent(result_base64, group))


        return result_base64 ?? false

    }

}

const service = new GroupService();
export default service;