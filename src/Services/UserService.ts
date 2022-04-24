import {update, updateAvatar as repositoryUpdateAvatar, updatePassword} from "../api/UserRepository";
import User from "../api/Models/User";

export enum UserServiceEvent {
    UpdateAvatar = "UpdateUserAvatar",
    UpdateUser = "UpdateUser",

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

export class UserUpdateEvent extends Event {
    user: User

    constructor(user: User, eventInitDict?: EventInit) {
        super(UserServiceEvent.UpdateUser, eventInitDict);
        this.user = user
    }
}

export interface UserServiceInterface {
    updateAvatar(file: File, user: User): Promise<string | undefined | false>

    update(user: User): Promise<void>

    updatePassword(password: string, user: User): Promise<void>
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

    async update(user: User): Promise<void> {
        await update(user);
        document.dispatchEvent(new UserUpdateEvent(user))
    }

    async updatePassword(password: string, user: User): Promise<void> {
        await updatePassword(user, password);
        document.dispatchEvent(new UserUpdateEvent(user))
    }
}

const service = new UserService();
export default service;