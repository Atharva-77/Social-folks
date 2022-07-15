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
   
    const [data, setdata] = useState('')

    //Select Tab
    const PostsTab_clicked_func = () => 
    {
        console.log("1.1HI");
        setPost_Tab(1);
        setkeyword('');
    }

    const UsersTab_clicked_func = () => 
    {
        console.log("2.2HI");
        setPost_Tab(0);
        setkeyword('');
    }
    




    //Enter key
    const handleKeyDown = (event) => 
    {
        if (event.key === 'Enter') 
        {
            submit_form()
        }
    }

    const submit_form = () => 
    {

        
        if(Post_Tab==1)
        {
            console.log("AAgaya", "Post",keyword);
        }
        else
        {
            console.log("AAgaya", "User", keyword);
        }

        // const content_data =
        // {
        //     "content": keyword.trim()
        // }

        axios.get(`http://localhost:4000/post/specificPost?keyword=${keyword}`)
            .then(res => {

                console.log("AXIOS:-", res.data);
                setdata(res.data);
            }
            )

        // console.log("PROPS.abc",props.greeted);
        // props.greeted();
    }

    {

        var result = Object.keys(data).map((key) => [data[key]]);
        console.log("SEARCH-RESULTss", result, typeof (result));

    }

    // console.log("Keyword", keyword);
  return (

    <div className='Search_top'>
          <h2 className="Search_title">Search</h2>
           

            <div className="header_search">

              <input className="header_input" placeholder="Search Posts / Users here" value={keyword} onChange={(e) => setkeyword(e.target.value)} onKeyDown={handleKeyDown} />
            
              <SearchOutlinedIcon className="header_searchIcon" onClick={submit_form} />
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

            {/* <h2>UU</h2> */}
           {Object.keys(data).length > 0 && data != "Error" ?
              <>
                  {/* If Follower part clicked */}
                    {Post_Tab == 1 ?

                      <>
                          {
                              followerResult != '' ?

                                  followerResult.map(i => {
                                      console.log("FRESULT ", followerResult);

                                      return <FollowList
                                          key={i[0]._id}
                                          id={i[0]._id}
                                          Icon={Avatar}
                                          displayName={i[0].Name}
                                          username={i[0].username}
                                      />

                                  })
                                  :

                                  <div className='Follow_NoFollows'>No Followers</div>
                          }
                      </>

                     :
                      <>
                          {
                              followingResult != '' ?

                                  followingResult.map(i => {
                                      console.log("FRESULT ", followingResult);

                                      return <FollowList
                                          key={i[0]._id}
                                          id={i[0]._id}
                                          Icon={Avatar}
                                          displayName={i[0].Name}
                                          username={i[0].username}

                                      />



                                  })
                                  :

                                  <div className='Follow_NoFollows'>Not Following Anyone</div>
                          }
                      </> /* ⬆️ Following tab closing bracket */
                  }
              </> /* ⬆️ Followers tab closing bracket */
              :
              /* ⬆️ If No SUCH USER */
              <>
                  {
                      data == "NO SUCH USER" ?
                          <div className='Follow_NoFollows'>No Such User</div>
                          :
                          <div className='Follow_NoFollows'>Invalid Details</div>
                  }

              </>
            }
    </div>
  )
}

export default Search