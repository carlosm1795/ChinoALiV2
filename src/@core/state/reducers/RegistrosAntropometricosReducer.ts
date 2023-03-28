import { RegistroAntropometria } from "src/Types/Types";
import { ActionType } from "../action-types";
import { Action } from "../actions";

const initialState:RegistroAntropometria = {
    _id:"",
    FechaMedicion:new Date(),
    Usuario:"",
    Values:[]
};

const reducer = (state:RegistroAntropometria = initialState,action:Action) => {
    switch(action.type){
        case ActionType.UpdateRegistrosAntropometricos:
            return action.payload        
        default:
            return state
    }
}

export default reducer