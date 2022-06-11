import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import { Avatar } from '@material-ui/core';
import './Profile.css'


function Profile() {
  
    const {id}=useParams();
    // console.log("/ID",id,id==typeof(undefined));

    const [profileData, setprofileData] = useState('');
    
    const dispatch = useDispatch();
    const userLoginData=useSelector(state=>state.userLoginKey)

    const {loading, userInfo, error}=userLoginData

   
    // console.log("PROFILE USE-SELECTOR",userInfo,userInfo.username);
   
    console.log("PROFILE Data ",profileData,profileData=="No Such User",Object.keys(profileData).length);

    useEffect(() => 
    {
            if(id==userInfo.username)
            {
                    console.log("LOGGED In user");
                    const config=
                    {
                        headers:
                        {
                            'Content-Type':"application/json",
                            Authorization:`Bearer ${userInfo.token}`
                        }
                    }
                
                    const userData=
                    {
                        "username":id
                    }
                

                    axios.post(`http://localhost:4000/profile/loggedin/${id}`,userData,config)
                    .then(res=>
                        {
                            console.log("Profile RES.DATA ",(res.data));         
                            setprofileData(res.data);       
                            
                        })

            }
            else if(id==typeof(undefined))
            {
                console.log("ID Undefined");
                setprofileData("No Such User")
            }
            else
            {
                console.log("NOT LOGGED IN");
                
                const userData=
                {
                    "username":id
                }
            
                axios.post(`http://localhost:4000/profile/${id}`,userData)
                .then(res=>
                    {
                        console.log("Profile RES.DATA ",(res.data));         
                        setprofileData(res.data);       
                        
                    })

            }
        

    }, [])

  return (
    <div className='Profile_Homepage_top1'>
        {/* Profile pg */}
        {!loading && Object.keys(profileData).length>0
        ?
            <div>
                {profileData!="No Such User"
                 ?
                  <div className='1Profile_Homepage_top'>
                        <h2>Username {profileData.email}</h2>
                            
                            <div className='Profile_Div_CoverPic'>
                                Cover Pic
                                <div>
                                    <Avatar style={{ textDecoration: 'none',backgroundColor:'red'}}/>
                                </div>
                            </div>

                    </div>
                 :
                 <div className='Profile_Homepage_top'>
                    <h2>No Such User</h2>
                 </div>
                }
                
            </div>    
        :
            <h2>No username</h2>
        }

                    {/* <div className='1Profile_Homepage_top'>
                        <h2>Username {profileData.email}</h2>
                            
                            <div className='Profile_Div_CoverPic'>
                                Cover Pic
                                <div>
                                    <Avatar style={{ textDecoration: 'none',backgroundColor:'red'}}/>
                                </div>
                            </div>

                    </div> */}

      
    </div>
  )
}

export default Profile