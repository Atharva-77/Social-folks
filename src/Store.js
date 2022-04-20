import {createStore,combineReducers,applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userLoginReducer } from "./Reducers/userReducer";

const reducer=combineReducers({
    userLoginKey: userLoginReducer
})


const store = createStore(reducer, composeWithDevTools( applyMiddleware(thunk)));
export default store;