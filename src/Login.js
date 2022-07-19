import React,{useState,useEffect} from 'react';
import './Login.css' ;
import { useDispatch,useSelector } from 'react-redux';
import { userAction_details } from './Reducers/actions/userActions';
import { Link } from 'react-router-dom';
import {  useHistory } from 'react-router'; 


function Login() {
    let history = useHistory()

    const [email, setemail] = useState('hi@2');
    const [password, setpassword] = useState('q1');
    // console.log(email);

    const dispatch = useDispatch();
    const userLoginData=useSelector(state=>state.userLoginKey)  

    const {loading, userInfo, error}=userLoginData
    console.log("USE-SELECTOR",userLoginData, userInfo);
    const redirect=`/`
    
    const submit_form=(e)=>
    {
      e.preventDefault() // use or no????????????????????????
      console.log('Submit form', email, password);

      dispatch(userAction_details(email,password));  
      console.log("2.USE-SELECTOR",userLoginData, userInfo);
      // setemail('')
      // setpassword('')
    }


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

  return (
    <div className='login_header'>
       
       <Link to="/">
            <img className="logo" src="https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg" />
       </Link>

      <div className='login_details'>
           
        
            <h1> Login </h1>

            {(userInfo=="Fail.No user" || error) && <h2>Error</h2>}
            {(userInfo=="Fail. Email or password not matching" || error) && <h3>Email or password not matching</h3>}
            

            <h2>Email</h2>
            <input value={email} onChange={(e)=>{ setemail(e.target.value) }} placeholder="Enter Email Id "/>

            <h2>Password</h2>
            <input type="password" value={password} onChange={(e)=>{ setpassword(e.target.value) }} placeholder="Enter Password"/>
      
            <button className='login_button' onClick={submit_form}>Login</button>
       </div>
    
    </div>
  )
}

export default Login