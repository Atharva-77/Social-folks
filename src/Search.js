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
import Post4 from './Post4';
import FollowList from './FollowList';


function Search() {

    const [Post_Tab, setPost_Tab] = useState(1);
    const [keyword, setkeyword] = useState('')
   
    const [data, setdata] = useState('')
    const [usersData, setusersData] = useState('')


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
            setdata('')
            console.log("AAgaya", "Post",keyword);
           
            axios.get(`http://localhost:4000/post/specificPost?keyword=${keyword}`)
                .then(res => {

                    console.log("SPECIFIC POST:-", res.data);
                    setdata(res.data);
                }
                )
        }
        else
        {
            setusersData('')
            console.log("AAgaya", "User", keyword);
           
            axios.get(`http://localhost:4000/post/specificUsers?keyword=${keyword}`)
                .then(res => {

                    console.log("USERS:-", res.data);
                    setusersData(res.data);
                }
                )
        }

    
    }

    {

        var result = Object.keys(data).map((key) => [data[key]]);
        console.log("POSTS-RESULTss", result, typeof (result));

    }

    {

        var usersResult = Object.keys(usersData).map((key) => [usersData[key]]);
        console.log("USERS-RESULTss", usersResult, typeof (usersResult));

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
          {(Object.keys(data).length || Object.keys(usersData).length ) > 0 && data != "Error" ?
              <>
                  {/* If Follower part clicked */}
                  {Post_Tab == 1 && Object.keys(data).length >0?

                      <>
                          {
                                result != '' ?

                                  result.map(i => {
                                        console.log("PRESULT ", result);

                                    return <Post4
                                                key={i[0]._id}
                                                id={i[0]._id}
                                                Icon={Avatar}
                                                displayName={i[0].postedBy.Name}
                                                username={i[0].postedBy.username}

                                                originalData={i[0].originalPostedBy}//ONLY THIS PART IS DIFFERENT....DURING RETWEET, DISPLAYNAME CHANGED....

                                                postText={i[0].content}
                                                createdAt={i[0].createdAt}
                                                // imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                                                verified="True"

                                                likeslength={i[0].likes.length}
                                                likesData={i[0].likes}
                                                retweetUserList={i[0].retweetUserList}
                                                retweetData={i[0].retweetDataId}
                                                replyDataId={i[0].replyDataId}
                                                who={2}
                                            />


                                    })

                                 :

                                  <div className='Follow_NoFollows'>No Such Posts</div>
                            }
                      </>

                     :
                      <>
                          {
                              usersResult != '' ?

                                  usersResult.map(i => {
                                      console.log("FRESULT ", usersResult);

                                      return <FollowList
                                          key={i[0]._id}
                                          id={i[0]._id}
                                          Icon={Avatar}
                                          displayName={i[0].Name}
                                          username={i[0].username}
                                      />


                                  })
                                  
                                  :

                                  <div className='Follow_NoFollows'>1.No Such User</div>
                          }
                      </> /* ⬆️ Following tab closing bracket */
                  }
              </> /* ⬆️ Followers tab closing bracket */
              :
              /* ⬆️ If No SUCH USER */
              <>
                  {
                      data == "NO SUCH USER" ?
                          <div className='Follow_NoFollows'>2.No Such User</div>
                          :
                          <div className='Follow_NoFollows'>1Invalid Details</div>
                  }

              </>
            }
    </div>
  )
}

export default Search