import {combineReducers} from "redux"
import toggleNewUser from "./newUserReducer";
import ChangeOnUser from "./changeUserReducer"
import UpdateRegistroAntropomoteria from "./RegistrosAntropometricosReducer"

const reducers = combineReducers({
    toggleNewUser:toggleNewUser,
    ChangeOnUser:ChangeOnUser,
    UpdateRegistroAntropomoteria:UpdateRegistroAntropomoteria
})

export default reducers;

export type State = ReturnType<typeof reducers>