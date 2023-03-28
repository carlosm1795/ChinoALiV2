import { RegistroAntropometria } from "src/Types/Types"
import {ActionType} from "../action-types"
interface ToggleNewUser {
    type:ActionType.ToggleNewUser
    payload:boolean
}

interface ChangeUser {
    type:ActionType.ChangeOnUsuario
    payload:string
}

interface UpdateRegistrosAntropometricos {
    type:ActionType.UpdateRegistrosAntropometricos
    payload:Array<RegistroAntropometria>
}
export type Action = UpdateRegistrosAntropometricos | ToggleNewUser | ChangeUser 