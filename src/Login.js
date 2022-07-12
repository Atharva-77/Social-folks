import React,{useState} from 'react'
import './Login.css' ;
import { useDispatch,useSelector } from 'react-redux';
import { userAction_details } from './Reducers/actions/userActions';
import { Link } from 'react-router-dom';



function Login() {

  const [email, setemail] = useState('hi@2');
  const [password, setpassword] = useState('q1');
  // console.log(email);

  const dispatch = useDispatch();
  const userLoginData=useSelector(state=>state.userLoginKey)

  const {loading, userInfo, error}=userLoginData
  console.log("USE-SELECTOR",userLoginData, userInfo);
  
  const submit_form=(e)=>
  {
    e.preventDefault() // use or no????????????????????????
    console.log('Submit form', email, password);

    dispatch(userAction_details(email,password));  console.log("2.USE-SELECTOR",userLoginData, userInfo);
    // setemail('')
    // setpassword('')
  }

  return (
    <div className='login_header'>
       
       <Link to="/">
            <img className="logo" src="https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg" />
       </Link>

      <div className='login_details'>
           
        
            <h1> Login </h1>

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