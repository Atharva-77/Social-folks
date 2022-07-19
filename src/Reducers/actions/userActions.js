import axios from 'axios'
import { USER_LOGIN_REQUEST, 
         USER_LOGIN_SUCCESS, 
         USER_LOGIN_FAILURE,

         USER_LOGOUT} from '../constants/userConstants'

const userLoginRequest=()=>
{
    return {
        type: USER_LOGIN_REQUEST
    }   
}

const userLoginSuccess= data =>
{
    return {
        type: USER_LOGIN_SUCCESS,
        payload: data

    }
}

const userLoginFailure= error=>
{
    return {
        type: USER_LOGIN_FAILURE,
        payload: error
    }
}


const userLogout = () =>
{
    return {
        type: USER_LOGOUT
    }
}

//Logout

export const logout_action=()=>async(dispatch)=> 
{
    dispatch(userLogout());
    console.log("logged  outttttttttt");
}

export const userAction_details=(email,password)=>async(dispatch) =>
{
    try
    {
        console.log("USER-ACTIONS", email,password);
        dispatch(userLoginRequest())
        
        // const config={
        //     headers:{
        //         'Content-type':"application/json"
        //     }
        // }
        
        //The result we get back is various objects with keys like config, data, headers, statustext. The data key has the all data, hence we destrucutre it.
        const {data}=await axios.post(`http://localhost:4000/login/add`,{email,password})

        console.log("DATA ",data);
        dispatch(userLoginSuccess(data))

    }
    catch(error)
    {
        dispatch(userLoginFailure())
    }   
}