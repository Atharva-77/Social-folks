import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router';
import axios from 'axios';
import { Avatar } from '@material-ui/core';
import './FollowList.css'

import { userAction_details } from './Reducers/actions/userActions';
import { Link } from 'react-router-dom';



function FollowList({ids,Icon,displayName, username , description,followers}) {
    
    
    
    const {id}=useParams();
    const { query } = useLocation(); 

    console.log(id,"FOLLOWLIST ",description);



  return (

    <div className='FollowList_top'>
        <div className="FollowList_header">

                 <Icon className="FollowList_avator" src="https://media-exp2.licdn.com/dms/image/C4D03AQGPawx5zAoFWg/profile-displayphoto-shrink_800_800/0/1600092593879?e=1659571200&v=beta&t=0ffRoHZIbjbW2K79t0l9JnAkEnWgp2vda1MXHWhUwYs" />

                <Link to={`/profile/${username}`} style={{ textDecoration: 'none', color: '#374151' }}>

                    <div className="FollowList_displayName">
                        {displayName}
                    </div>

                </Link>
                
                  &nbsp;&nbsp;
                <div className="FollowList_username">@{username} </div>

        </div>

          <div className="FollowList_description">
              {
                description!=undefined
                ?
                  description
                :
                  <> 
                    No Description
                  </>
              }
              {/* Full Stack Developer. Tech Blogger ✍. Help people master JavaScript and React. Stepping into Web 3.0. DM 📩 for Collaboration 👀 */}
          </div>
            {/* <h1>{ followers}</h1> */}

          {/* <h1>{ }</h1> */}
    </div>

  )
}

export default FollowList