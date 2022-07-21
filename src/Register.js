import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import './Register.css' ;
import { useDispatch,useSelector } from 'react-redux';
import {userAction_details} from './Reducers/actions/userActions'
import {  useHistory } from 'react-router'; 
import { LINKURL } from './Reducers/constants/userConstants';


function Register() {

  let history = useHistory()

  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  
  const redirect=`/`

    // console.log(email);
    const dispatch = useDispatch();
    const userLoginData=useSelector(state=>state.userLoginKey)
    const {loading, userInfo, error}=userLoginData

   useEffect(() => 
     {
          //when getting request, userinfo becomes true as  userLoginRequest is called.
          //length==0 becomes when 1st time login pg is visited
          //Fail.No user is received when details don't match

          //if user is logged in  direct to home page..not working when aftr login  i type login_brad url, everything gets refreshed
          if( !(typeof(userInfo)=='undefined') && userInfo.length!=0 && userInfo!=='Fail.No user' && userInfo!="Fail. Email or password not matching")
          {
              console.log("Login useeffect, redirect");
              history.push(redirect)
          }
          
     }, [history,userInfo,redirect])


  const submit_form=(e)=>
  {
      // e.preventDefault() // use or no????????????????????????
      console.log('Submit form', Name,Email,Username, Password,confirmPassword);
    
      // console.log(config);
      const register_data=
      {
        "name": Name,
        "username":Username,
        "email":Email,
        "password": Password
      }


      axios.post(`${LINKURL}/register/add`,register_data)
      .then( res =>
            {
                  console.log("AXIOS:-",res.data); 
                  // console.log("PROPS.parentHandler",props.parentHandler); 
                  dispatch(userAction_details(Email,Password));   
             } 
         )
        //  dispatch(userAction_details(Email,Password));  
   }

  return (
    <div className='register_header'>
       
          <Link to="/">
                <img className="logo" src="https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg" />
          </Link>

       <div className='register_details'>
           
        
            <h1> Register </h1>

            <h2>Your Name</h2>
            <input value={Name} onChange={(e)=>{ setName(e.target.value) }} placeholder="Enter Full Name "/>

            <h2>Email</h2>
            <input value={Email} onChange={(e)=>{ setEmail(e.target.value) }} placeholder="Enter Email Id "/>


            <h2>Username</h2>
            <input value={Username} onChange={(e)=>{ setUsername(e.target.value) }} placeholder="Enter Username"/>

            <h2>Password</h2>
            <input type="password" value={Password} onChange={(e)=>{ setPassword(e.target.value) }} placeholder="Enter Password"/>

            <h2>Confirm Password</h2>
            <input type="password" value={confirmPassword} onChange={(e)=>{ setconfirmPassword(e.target.value) }} placeholder="Re-Enter Password"/>

            <button className='register_button' onClick={submit_form}>Create Your Account</button>
            <h3>OR</h3>

            <Link to="/login"  >
                    <button className='login_button' onClick={submit_form}>Login</button>
            </Link>
       
       </div>
    
    </div>
  )
}

export default Register