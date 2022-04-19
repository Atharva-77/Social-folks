import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import './Register.css' ;




function Register() {

  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  // console.log(email);

  const submit_form=(e)=>
  {
    // e.preventDefault() // use or no????????????????????????
    console.log('Submit form', Name,Email, Password,confirmPassword);
  }

  return (
    <div className='register_header'>
       
       <img className="logo" src="https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg" />
     
       <div className='register_details'>
           
        
            <h1> Register </h1>

            <h2>Your Name</h2>
            <input value={Name} onChange={(e)=>{ setName(e.target.value) }} placeholder="Enter Full Name "/>

            <h2>Email</h2>
            <input value={Email} onChange={(e)=>{ setEmail(e.target.value) }} placeholder="Enter Email Id "/>

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