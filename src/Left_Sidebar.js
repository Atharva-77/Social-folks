import React from 'react'
import './Left_Sidebar.css';
import TwitterIcon from '@material-ui/icons/Twitter';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PersonIcon from '@material-ui/icons/Person';
import Left_Sidebar_Icons from './Left_Sidebar_Icons';

import VpnKeyIcon from '@material-ui/icons/VpnKey';
// import LogoutIcon from '@material-ui/icons/Logout';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import Home from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {logout_action} from './Reducers/actions/userActions'

function Left_Sidebar() {

    const dispatch=useDispatch()
    
    const userLoginData=useSelector(state=>state.userLoginKey)

    const {loading, userInfo, error}=userLoginData
    console.log("USERINGOOO",userInfo);

    const logoutHandler=()=>
    {
        console.log("Logout clicked");
        dispatch(logout_action())
        
    }

    return (
        <div className="Left_Sidebar">
                <div className="Left_Sidebar_sticky_title">
            
                         <Link to="/">
                                <TwitterIcon className="main_icon"/>
                         </Link>
                    

                        <Link to="/" style={{ textDecoration: 'none', color: '#374151' }}>
                            <Left_Sidebar_Icons name="Home" Icons={HomeIcon} />
                        </Link>

                        
                        
                        <Link to={`/search`} style={{ textDecoration: 'none', color: '#374151' }}>
                            <Left_Sidebar_Icons name="Search" Icons={SearchIcon} />
                       </Link>

                    
                            {typeof(userInfo.id)=='undefined'?
                                <>
                                    <Link to={`/login`}  style={{ textDecoration: 'none',color:'#374151'}}> 
                                        <Left_Sidebar_Icons name="Login" Icons={VpnKeyIcon} />
                                    </Link>

                                    <Link to={`/register`}  style={{ textDecoration: 'none',color:'#374151'}}> 
                                        <Left_Sidebar_Icons name="Register" Icons={VpnKeyIcon} />
                                    </Link>
                                </>
                                
                             : 
                                <>
                                    <div className="Sidebar_Icons" onClick={logoutHandler}>
                                        <PowerSettingsNewIcon className="icon"/> 
                                        <div className="name">Logout</div>
                                    </div>
                                </>
                            }
                            {/* <Left_Sidebar_Icons name="Bookmark" Icons={BookmarkIcon } /> */}
                             {/* <Left_Sidebar_Icons name="Profile" Icons={PersonIcon} /> */}

                        {typeof(userInfo.id)!='undefined'?
                            
                            <Link to={`/profile/${userInfo.username}`}  style={{ textDecoration: 'none',color:'#374151'}}> 
                                <Left_Sidebar_Icons name="Profile" Icons={PersonIcon} />
                            </Link>
                         :
                            null
                        }
                        
                    
                            {/* <button className="post_button">+ Post</button> */}
                 </div>
        </div>
    )
}

export default Left_Sidebar
