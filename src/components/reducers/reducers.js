

const SET_USERS = 'SET_USERS';
const SEARCH_USERS ='SEARCH_USERS';
const SET_FOUND_USER ='SET_FOUND_USER';
const SET_FOUND_USER_REPOS='SET_FOUND_USER_REPOS';
const CURRENT_PAGE='CURRENT_PAGE';
const SET_IS_FETCHING ='SET_IS_FETCHING';
const SET_USER_REPOS = 'SET_USER_REPOS';

const initialState={
    items: [],
    isFetching: true,
    users : [],
    repos:[],
    currentPage: 1,
    totalCount: 0,
    perPage: 10
}



export const setUsersReducer = (state= initialState, action)=>{
    switch (action.type){
        case SET_USERS:
            return {
                ...state,
                items: action.payload,
                totalCount: action.payload.public_repos,
                isFetching: false
            }
        case SET_USER_REPOS:
            return {
                ...state,
                repos: action.payload,
                isFetching: false
            }
        case CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        default:
            return state
    }
}

export const searchUsersReducer = (state=initialState, action) =>{
    switch (action.type){
        case SEARCH_USERS:
            return{
                ...state,
                users:action.payload
            }
        default:
            return state
    }
}

export const setFoundUserReducer =(state = initialState, action) => {
    switch (action.type){
        case SET_FOUND_USER:
            return {
                ...state,
                items: action.payload,
                totalCount: action.payload.public_repos
            }
        case SET_FOUND_USER_REPOS:
            return {
                ...state,
                repos: action.payload,
                isFetching: false
            }
        case CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        default:
            return state
    }
}

export const getUsersAction = (userData) => ({type: SET_USERS, payload: userData});
export const searchUsersAction = (userData) => ({type: SEARCH_USERS, payload: userData});
export const setFoundUserAction =(userdata) => ({type : SET_FOUND_USER, payload: userdata});
export const setFoundUserReposAction =(repos) => ({type: SET_FOUND_USER_REPOS, payload:repos});
export const setCurrentPageAction =(currentPage) => ({type: CURRENT_PAGE, payload:currentPage});
export const setIsFetchingAction =(bool) => ({type: SET_IS_FETCHING, payload:bool});
export const getUsersReposAction =(repos) => ({type: SET_USER_REPOS, payload: repos});
