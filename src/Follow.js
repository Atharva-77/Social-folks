import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import { Avatar } from '@material-ui/core';
import './Follow.css'

import { userAction_details } from './Reducers/actions/userActions';



function Follow() {

    const {id}=useParams();

    const [followTab, setfollowTab] = useState(1);

    useEffect(() => 
    {
        //Followers list
        //Following list
            // if(id==typeof(undefined))
            // {
            //     console.log("ID Undefined");
            //     setprofileData("NO SUCH USER")
            // }
            // else
            // {
            //     console.log("YES/NOT LOGGED IN");
                
            //     const userData=
            //     {
            //         "username":id
            //     }
            
            //     axios.post(`http://localhost:4000/profile/${id}`,userData)
            //     .then(res=>
            //         {
            //             console.log("Profile RES.DATA ",(res.data));         
            //             setprofileData(res.data);       
                        
            //         })

            //     axios.get(`http://localhost:4000/post/postedBy/${id}`)
            //     .then(res=>
            //         {
            //             // console.log("Posts all  RES.DATA ",(res.data));         
            //             // setprofileData(res.data);   
            //             setdata(res.data);    
                        
            //         })

            //     axios.get(`http://localhost:4000/post/postedBy/likes/${id}`)
            //     .then(res=>
            //         {
            //             // console.log("Likes  RES.DATA ",(res.data));         
            //             // setprofileData(res.data);   
            //             setlikesdata(res.data);    
                        
            //         })
            // }
        

    }, [id])


    const FollowersTab_clicked_func=()=>
    {
        console.log("HI");
        setfollowTab(1);
    }

    const FollowingTab_clicked_func=()=>
    {
        console.log("2HI");
        setfollowTab(0);
    }


  return (

    <div className='Follow_top'>
        <h2>Username </h2>
        {/* {profileData.username} */}
        <div className='Follow_followers_following_tab'>
                                            
                {followTab==1?
                    <>
                        <div className='Follow_tab_underline' onClick={()=>FollowersTab_clicked_func()}> Followers </div>
                        <div className='Follow_tab' onClick={()=>FollowingTab_clicked_func()}> Following </div>
                    </>
                 :
                    
                    <>
                       <div className='Follow_tab' onClick={()=>FollowersTab_clicked_func()}> Followers </div>
                       <div className='Follow_tab_underline' onClick={()=>FollowingTab_clicked_func()}> Following </div>                                                 
                    </>
                }

         </div>

    </div>

  )
}

export default Follow