import { ActionType } from "../action-types"
import { Dispatch } from "redux"
import { Action } from "../actions"

export const ToggleNewUser = (mode:boolean) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:ActionType.ToggleNewUser,
            payload:mode
        })
    }
}

export const ChangeOnUser = (mode:string) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:ActionType.ChangeOnUsuario,
            payload:mode
        })
    }
}