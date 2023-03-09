import {ActionType} from "../action-types"
interface ToggleNewUser {
    type:ActionType.ToggleNewUser
    payload:boolean
}

interface ChangeUser {
    type:ActionType.ChangeOnUsuario
    payload:string
}

export type Action = ToggleNewUser | ChangeUser