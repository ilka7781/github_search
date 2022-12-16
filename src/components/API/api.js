import axios from "axios";
import {
    getUsersAction, getUsersReposAction,
    searchUsersAction,
    setFoundUserAction,
    setFoundUserReposAction,
    setIsFetchingAction
} from "../reducers/reducers";
export const base = 'https://api.github.com/';



export const getUserRequest =(currentPage, perPage, sort)=>{
    return async (dispatch) =>{
        dispatch(setIsFetchingAction(false));
        const response = await axios.get(`${base}users/ilka7781`);
        const responseRepos = await axios.get(`${base}users/ilka7781/repos?page=${currentPage}&per_page=${perPage}&sort=${sort}`);
        dispatch(getUsersAction(response.data));
        dispatch(getUsersReposAction(responseRepos.data));
    }
}

export const searchUserRequest =(searchQuery)=>{
    return async (dispatch) =>{
        const response = await axios.get(`${base}search/users?q=${searchQuery}`);
        dispatch(searchUsersAction(response.data))
    }
}

export const setFoundUserRequest = (userLogin,  currentPage, perPage, sort) =>{
    return async (dispatch) =>{
        dispatch(setIsFetchingAction(true));
        const response = await axios.get(`${base}users/${userLogin}`);
        const responseRepos = await axios.get(`${base}users/${userLogin}/repos?page=${currentPage}&per_page=${perPage}&sort=${sort}`);
        dispatch(setFoundUserAction(response.data));
        dispatch(setFoundUserReposAction(responseRepos.data));
    }
}
export const sortRequestApi =(login, currentPage, perPage, sort) =>{
    return async (dispatch) => {
        if(sort === ''){
            sort='created';
        }
        dispatch(setIsFetchingAction(true));
        const responseRepos= await axios.get(`${base}users/${login}/repos?page=${currentPage}&per_page=${perPage}&sort=${sort}`);
        dispatch(setFoundUserReposAction(responseRepos.data));
    }
}
export const sortRequestApiUser =(currentPage, perPage, sort) =>{
    return async (dispatch) => {
        if(sort === ''){
            sort='created';
        }
        dispatch(setIsFetchingAction(true));
        const responseRepos= await axios.get(`${base}users/ilka7781/repos?page=${currentPage}&per_page=${perPage}&sort=${sort}`);
        dispatch(getUsersReposAction(responseRepos.data));
    }
}

