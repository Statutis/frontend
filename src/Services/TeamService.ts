import Team from "../api/Models/Team";
import {updateAvatar as repositoryUpdateAvatar} from "../api/TeamRepository";


export enum TeamServiceEvent {
    UpdateAvatar = "UpdateTeamAvatar",

}

export class TeamAvatarUpdateEvent extends Event {
    avatarData: string | undefined
    team: Team

    constructor(avatarData: string | undefined, user: Team, eventInitDict?: EventInit) {
        super(TeamServiceEvent.UpdateAvatar, eventInitDict);
        this.avatarData = avatarData
        this.team = user
    }
}

export interface TeamServiceInterface {
    updateAvatar(file: File, user: Team): Promise<string | undefined | false>
}

class TeamService implements TeamService {
    async updateAvatar(file: File | undefined, user: Team): Promise<string | undefined | false> {
        await repositoryUpdateAvatar(file, user)

        if (!file) {
            document.dispatchEvent(new TeamAvatarUpdateEvent(undefined, user))
            return undefined
        }

        const result_base64: string | undefined = await new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result as string | undefined);
            fileReader.readAsDataURL(file);
        });
        document.dispatchEvent(new TeamAvatarUpdateEvent(result_base64, user))


        return result_base64 ?? false

    }

}

const service = new TeamService();
export default service;