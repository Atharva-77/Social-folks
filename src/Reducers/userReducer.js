import { USER_LOGIN_REQUEST, 
         USER_LOGIN_SUCCESS,
         USER_LOGIN_FAILURE,
         USER_LOGOUT } from "./constants/userConstants";


const initialUserState=
{
    loading:false,
    userInfo:[],
    error:''
}

export const userLoginReducer = (state=initialUserState,action)=>
{
    switch(action.type){

        case USER_LOGIN_REQUEST: return {
            loading: true
        }

        case USER_LOGIN_SUCCESS: return {
            loading: false,
            userInfo: action.payload
        }

        case USER_LOGIN_FAILURE: return {
            loading: false,
            error: action.payload
        }

        case USER_LOGOUT: return {
            loading: false,
            userInfo:[],
            error:''    
        }
        
        default:
            return state
    }
}