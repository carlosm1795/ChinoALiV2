import {combineReducers} from "redux"
import toggleNewUser from "./newUserReducer";
import ChangeOnUser from "./changeUserReducer"

const reducers = combineReducers({
    toggleNewUser:toggleNewUser,
    ChangeOnUser:ChangeOnUser
})

export default reducers;

export type State = ReturnType<typeof reducers>