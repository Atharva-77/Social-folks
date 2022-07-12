import React from 'react'
import './Left_Sidebar.css';
import TwitterIcon from '@material-ui/icons/Twitter';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PersonIcon from '@material-ui/icons/Person';
import Left_Sidebar_Icons from './Left_Sidebar_Icons';
import Home from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

function Left_Sidebar() {

    const userLoginData=useSelector(state=>state.userLoginKey)

    const {loading, userInfo, error}=userLoginData

    return (
        <div className="Left_Sidebar">
            {/* <h1>Sidebar left</h1> */}
            <Link to="/">
                    <TwitterIcon className="main_icon"/>
            </Link>
             
            <Left_Sidebar_Icons name="Home" Icons={HomeIcon} />
            <Left_Sidebar_Icons name="Explore" Icons={SearchIcon} />
            <Left_Sidebar_Icons name="Bookmark" Icons={BookmarkIcon } />
            {/* <Left_Sidebar_Icons name="Profile" Icons={PersonIcon} /> */}

            <Link to={`/profile/${userInfo.username}`}  style={{ textDecoration: 'none',color:'#374151'}}> 
                <Left_Sidebar_Icons name="Profile" Icons={PersonIcon} />
            </Link>
            
            <button className="post_button">+ Post</button>
            
        </div>
    )
}

export default Left_Sidebar
