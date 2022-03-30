import React,{useState} from 'react'
import './Login.css' ;




function Login() {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  // console.log(email);

  const submit_form=(e)=>
  {
    // e.preventDefault() // use or no????????????????????????
    console.log('Submit form', email, password);
  }

  return (
    <div className='login_header'>
       
       <img className="logo" src="https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg" />
     
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