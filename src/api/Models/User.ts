export default class User {
    ref: string
    avatarRef: string | undefined
    username: string
    email: string
    roles: string[]
    teamsRef: string[]

    constructor() {
        this.ref = ""
        this.avatarRef = undefined
        this.username = "unknown"
        this.email = "unknown"
        this.roles = []
        this.teamsRef = []
    }

    isGranted(role: string | string[]): boolean {
        return (typeof role === "string" && this.roles.includes(role)) || (Array.isArray(role) && role.every(x => this.roles.includes(x)));
    }
}