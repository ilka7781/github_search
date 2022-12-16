import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {searchUsersReducer, setFoundUserReducer, setUsersReducer} from "../reducers/reducers";




const rootReducer= combineReducers({
    setUser: setUsersReducer,
    searchUser : searchUsersReducer,
    setFoundUser : setFoundUserReducer
})

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk))) ;

