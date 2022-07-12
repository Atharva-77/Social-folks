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
    const [postTabclicked, setpostTabclicked] = useState(1);

    const dispatch = useDispatch();
    const userLoginData=useSelector(state=>state.userLoginKey)

    const {loading, userInfo, error}=userLoginData

   
    // console.log("PROFILE USE-SELECTOR",userInfo,userInfo.username);
   
    console.log("PROFILE Data ",profileData,profileData=="No Such User",Object.keys(profileData).length,"Userinfo",Object.keys(userInfo).length);

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

    const postsTab_clicked=()=>
    {
        console.log("Posts tab clicked");
        setpostTabclicked(1);
    }

    const replyTab_clicked=()=>
    {
        console.log("Replies tab clicked");
        setpostTabclicked(0);
    }

  return (
    <div className='Profile_top'>
        {/* Profile pg */}
        {!loading && Object.keys(profileData).length>0
        ?
            <div>
                    {profileData!="No Such User"
                    ?
                        <div className='1Profile_Homepage_top'>
                                <h2>Username {profileData.username}</h2>
                                    
                                    <div className='Profile_Div_CoverPic'>
                                        
                                      
                                        <div className='Profile_avatar_header'>
                                            <Avatar className="Profile_avatar" style={{ textDecoration: 'none',backgroundColor:'red'}} 
                                                 src="https://media-exp2.licdn.com/dms/image/C4D03AQGPawx5zAoFWg/profile-displayphoto-shrink_800_800/0/1600092593879?e=1659571200&v=beta&t=0ffRoHZIbjbW2K79t0l9JnAkEnWgp2vda1MXHWhUwYs"/>

                                                 {/* <div className='Profile_follow_div'> */}
                                                 {/* {Object.keys(userinfo)==0?} */}
                                                 
                                                  <button className='Profile_follow_button'>Follow</button>
                                                  <button className='Profile_following_button'>Following</button>
                                                 {/* </div> */}
                                        </div>

                                        <div className='Profile_displayName'>{profileData.Name}</div>
                                        <div className='Profile_username'>@{profileData.username}</div>
                                        <div className='Profile_description'>Description here-{profileData.description}/</div>
                                    
                                        {/* {typeof(profileData.followers)} */}
                                        {/* {profileData.followers ||0} */}
                                       
                                        <div className='Profile_followers_following'> 

                                            <span className='Profile_follow'> {profileData.followers||0} </span> 
                                            <span className='Profile_follow_text'> Followers </span>  &nbsp; &nbsp; 

                                            <span className='Profile_follow'> {profileData.following||0} </span>  
                                            <span className='Profile_follow_text'> Following </span> 

                                        </div>
                                        
                                        {/* <div className='Profile_followers'>{profileData.followers||0} Followers</div>
                                        <div >{profileData.following||0} Following</div> */}
                                        
                                        {/* <button className='1Profile_follow_button'>Follow</button> */}

                                        {/* <div className='Profile_post_reply_tab'>
                                            <div className='Profile_post_tab' onClick={()=>postsTab_clicked()}> Posts </div>
                                            <div className='Profile_reply_tab' onClick={()=>replyTab_clicked()}> Replies </div>
                                        </div> */}
                                        <div className='Profile_post_reply_tab'>
                                            
                                            {postTabclicked==1?
                                                <>
                                                    <div className='Profile_tab_underline' onClick={()=>postsTab_clicked()}> Posts </div>
                                                    <div className='Profile_tab' onClick={()=>replyTab_clicked()}> Replies </div>
                                                </>
                                            :
                                                <>
                                                    <div className='Profile_tab' onClick={()=>postsTab_clicked()}> Posts </div>
                                                    <div className='Profile_tab_underline' onClick={()=>replyTab_clicked()}> Replies </div>
                                                </>
                                            }

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