import { combineReducers } from "redux";
import userReducer from './userReducer';
import displayReducer from './displayReducer';

const rootReducer = combineReducers({
    userReducer,
    displayReducer
})

export default rootReducer;