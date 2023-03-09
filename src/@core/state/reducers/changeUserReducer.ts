import { ActionType } from "../action-types";
import { Action } from "../actions";

const initialState = "";

const reducer = (state:string = initialState,action:Action) => {
    switch(action.type){
        case ActionType.ChangeOnUsuario:
            return action.payload        
        default:
            return state
    }
}

export default reducer