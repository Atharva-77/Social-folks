import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router';
import axios from 'axios';
import { Avatar } from '@material-ui/core';
import './Search.css'

import { userAction_details } from './Reducers/actions/userActions';
import { Link } from 'react-router-dom';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { logDOM } from '@testing-library/react';


function Search() {

    const [Post_Tab, setPost_Tab] = useState(1);
    const [keyword, setkeyword] = useState('')
    
    const PostsTab_clicked_func = () => {
        console.log("1.1HI");
        setPost_Tab(1);
    }

    const UsersTab_clicked_func = () => {
        console.log("2.2HI");
        setPost_Tab(0);
    }
    console.log("Keyword",keyword);

  return (

    <div className='Search_top'>
          <h2 className="Search_title">Search</h2>
           

            <div className="header_search">

              <input className="header_input" placeholder="Search Posts / Users here" onChange={(e) => setkeyword(e.target.value)} />
            
                <SearchOutlinedIcon className="header_searchIcon"  />
            </div>


          <div className='Search_Posts_Users_tab'>
             {
                   
                <>
                    {Post_Tab == 1 ?
                        <>
                            <div className='Search_Post_tab_underline' onClick={() => PostsTab_clicked_func()}> Posts </div>
                            <div className='Search_Post_tab' onClick={() => UsersTab_clicked_func()}> Users </div>

                        </>
                        :

                        <>
                            <div className='Search_Post_tab' onClick={() => PostsTab_clicked_func()}> Posts </div>
                            <div className='Search_Post_tab_underline' onClick={() => UsersTab_clicked_func()}> Users </div>
                        </>
                    }
                </>

             }
            </div>
    </div>
  )
}

export default Search