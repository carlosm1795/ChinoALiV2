import { ActionType } from "../action-types";
import { Action } from "../actions";

const initialState = false;

const reducer = (state:boolean = initialState,action:Action) => {
    switch(action.type){
        case ActionType.ToggleNewUser:
            return action.payload        
        default:
            return state
    }
}

export default reducer