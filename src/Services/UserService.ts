import {updateAvatar as repositoryUpdateAvatar} from "../api/UserRepository";
import User from "../api/Models/User";

export enum UserServiceEvent {
    UpdateAvatar = "UpdateUserAvatar"

}

export class AvatarUpdateEvent extends Event {
    avatarData: string | undefined
    user: User

    constructor(avatarData: string | undefined, user: User, eventInitDict?: EventInit) {
        super(UserServiceEvent.UpdateAvatar, eventInitDict);
        this.avatarData = avatarData
        this.user = user
    }
}

export interface UserServiceInterface {
    updateAvatar(file: File, user: User): Promise<string | undefined | false>
}


class UserService implements UserServiceInterface {
    async updateAvatar(file: File | undefined, user: User): Promise<string | undefined | false> {
        await repositoryUpdateAvatar(file, user)

        if (!file) {
            document.dispatchEvent(new AvatarUpdateEvent(undefined, user))
            return undefined
        }

        const result_base64: string | undefined = await new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result as string | undefined);
            fileReader.readAsDataURL(file);
        });
        document.dispatchEvent(new AvatarUpdateEvent(result_base64, user))


        return result_base64 ?? false

    }
}

const service = new UserService();
export default service;