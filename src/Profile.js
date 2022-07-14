import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import { Avatar } from '@material-ui/core';
import './Profile.css'

import { userAction_details } from './Reducers/actions/userActions';

import Post4 from './Post4';
import { Link } from 'react-router-dom';


function Profile() {
  
    const {id}=useParams();
    // console.log("/ID",id,id==typeof(undefined));

    const [profileData, setprofileData] = useState('');
    const [postTabclicked, setpostTabclicked] = useState(1);
    const [replyTabclicked, setreplyTabclicked] = useState(0);
    const [data, setdata] = useState('');
    const [likesdata, setlikesdata] = useState('');
    
 

    const dispatch = useDispatch();
    const userLoginData=useSelector(state=>state.userLoginKey)

    const {loading, userInfo, error}=userLoginData
    
    
    // const [email, setemail] = useState('hi@1');
    // const [password, setpassword] = useState('q1');

    // setemail(userInfo.email);
    // setpassword(userInfo.password);
   
    // console.log("PROFILE USE-SELECTOR",userInfo,userInfo.username);
    // console.log("ID-FOLLOW",id,userInfo.username);
    // console.log("PROFILE Data ",profileData,profileData=="No Such User",Object.keys(profileData).length,"Userinfo",Object.keys(userInfo).length);

    useEffect(() => 
    {
            if(id==typeof(undefined))
            {
                console.log("ID Undefined");
                setprofileData("NO SUCH USER")
            }
            else
            {
                console.log("YES/NOT LOGGED IN");
                
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

                axios.get(`http://localhost:4000/post/postedBy/${id}`)
                .then(res=>
                    {
                        // console.log("Posts all  RES.DATA ",(res.data));         
                        // setprofileData(res.data);   
                        setdata(res.data);    
                        
                    })

                axios.get(`http://localhost:4000/post/postedBy/likes/${id}`)
                .then(res=>
                    {
                        // console.log("Likes  RES.DATA ",(res.data));         
                        // setprofileData(res.data);   
                        setlikesdata(res.data);    
                        
                    })
            }
        

    }, [id])

    const postsTab_clicked_func=()=>
    {
        console.log("Posts tab clicked",data);
        setdata(1);
        setpostTabclicked(1);
        setreplyTabclicked(0);

        //To update data
        const userData=
        {
            "username":id
        }

        axios.get(`http://localhost:4000/post/postedBy/${id}`)
        .then(res=>
            {
                console.log("1.1.Posts all  RES.DATA ",(res.data));         
                // setprofileData(res.data);   
                setdata(res.data);    
                
            })  

        axios.get(`http://localhost:4000/post/postedBy/likes/${id}`)
        .then(res=>
            {
                console.log("Likes  RES.DATA ",(res.data));         
                // setprofileData(res.data);   
                setlikesdata(res.data);    
                
            })
               
    }

    const replyTab_clicked_func=()=>
    {
        console.log("Replies tab clicked",data);
        setdata(1);
        setpostTabclicked(0);
        setreplyTabclicked(1);

         //To update data
         const userData=
         {
             "username":id
         }
        axios.get(`http://localhost:4000/post/postedBy/${id}`)
        .then(res=>
            {
                console.log("ReplyPosts all  RES.DATA ",(res.data));         
                // setprofileData(res.data);   
                setdata(res.data);    
                
            })  

        axios.get(`http://localhost:4000/post/postedBy/likes/${id}`)
        .then(res=>
            {
                console.log("Likes  RES.DATA ",(res.data));         
                // setprofileData(res.data);   
                setlikesdata(res.data);    
                
            })
               

        
    }

    const likeTab_clicked_func=()=>
    {
        console.log("Like tab clicked");
        setpostTabclicked(0);
        setreplyTabclicked(0);
        
        axios.get(`http://localhost:4000/post/postedBy/likes/${id}`)
            .then(res=>
                {
                    console.log("Likes  RES.DATA ",(res.data));         
                    // setprofileData(res.data);   
                    setlikesdata(res.data);    
                    
                })

        const userData=
         {
             "username":id
         }
         
        axios.get(`http://localhost:4000/post/postedBy/${id}`)
        .then(res=>
            {
                console.log("ReplyPosts all  RES.DATA ",(res.data));         
                // setprofileData(res.data);   
                setdata(res.data);    
                
            })  
           
    }

    const follow_following_func=()=>
    {
        console.log("Follwo Id of user is",profileData._id,profileData.followers.includes(userInfo.id));
        
        const postData=
         {
            "userFollowId":profileData._id
         }

        axios.put(`http://localhost:4000/profile/followRoute/${userInfo.username}`,postData)
        .then(res=>
            {
                // dispatch(userAction_details(userInfo.email,'q1')); 

                console.log("Follow data all  RES.DATA ",(res.data));         
                // setprofileData(res.data);   
                setprofileData(res.data);    
                
                
            })


    }

    // const following_func=()=>
    // {
    //     console.log("Following Id of user is",id);
    // }

    {
        
            var result = Object.keys(data).map((key) => [data[key]]);
            console.log("RESULTss",result,typeof(result));
        
    }
    {
        
        var likesresult = Object.keys(likesdata).map((key) => [likesdata[key]]);
        // console.log("LikeRESULTss",likesresult,typeof(likesresult),"\nDATA",likesdata);
    
    }

  return (
    <div className='Profile_top'>
        {/* Profile pg */}
        {!loading && Object.keys(profileData).length>0 
        ?
            <div>
                    {profileData!="NO SUCH USER"
                    ?
                        <div className='1Profile_Homepage_top'>
                                <h2>Username {profileData.username}</h2>
                                    
                                    <div className='Profile_Div_CoverPic'>
                                        
                                      
                                        <div className='Profile_avatar_header'>
                                            <Avatar className="Profile_avatar" style={{ textDecoration: 'none',backgroundColor:'red'}} 
                                                 src="https://media-exp2.licdn.com/dms/image/C4D03AQGPawx5zAoFWg/profile-displayphoto-shrink_800_800/0/1600092593879?e=1659571200&v=beta&t=0ffRoHZIbjbW2K79t0l9JnAkEnWgp2vda1MXHWhUwYs"/>


                                                 {/* <div className='Profile_follow_div'> */}

                                                 {Object.keys(userInfo)==0?
                                                  <button className='Profile_follow_button'>Follow</button>
                                                 :
                                                 <>
                                                    {id!==userInfo.username?
                                                          <> 

                                                            { profileData.followers.includes(userInfo.id)?

                                                                <button className='Profile_following_button' onClick={()=>follow_following_func()}>Following</button>
                                                             :
                                                              <button className='Profile_follow_button' onClick={()=>follow_following_func()}>Follow</button>

                                                            }

                                                          </>
                                                    :
                                                         null
                                                    }
                                                 </>
                                                    // null
                                                 }
                                                 
                                                  {/* <button className='Profile_follow_button' onClick={()=>follow_following_func()}>Follow</button>
                                                     <button className='Profile_following_button' onClick={()=>follow_following_func()}>Following</button> */}
                                                 {/* </div> */}
                                        </div>

                                        <div className='Profile_displayName'>{profileData.Name}</div>
                                        <div className='Profile_username'>@{profileData.username}</div>
                                        <div className='Profile_description'>Description here-{profileData.description}/</div>
                                    
                                    
                                       
                                        <div className='Profile_followers_following'> 
                                            
                                            <Link to={{pathname:`/follow/${id}` ,query:1}}  style={{ textDecoration: 'none',color:'#374151'}} hi={1}> 
       
                                                <span className='Profile_follow'> {Object.keys(profileData.followers).length } </span>  
                                                <span className='Profile_follow_text'> Followers </span>  &nbsp; &nbsp; 
                                            </Link>

                                            <Link to={{pathname:`/follow/${id}` ,query:0}}   style={{ textDecoration: 'none',color:'#374151'}}> 
                                                <span className='Profile_follow'> {Object.keys(profileData.following).length||0} </span>  
                                                <span className='Profile_follow_text'> Following </span> 
                                            
                                            </Link>

                                        </div>
                                        
                                       
                                        <div className='Profile_post_reply_tab'>
                                            
                                            {postTabclicked==1?
                                                <>
                                                    <div className='Profile_tab_underline' onClick={()=>postsTab_clicked_func()}> Posts </div>
                                                    <div className='Profile_tab' onClick={()=>replyTab_clicked_func()}> Replies </div>
                                                    <div className='Profile_tab' onClick={()=>likeTab_clicked_func()}> Likes </div>
                                                </>
                                             :
                                                <>
                                                    {replyTabclicked==1?
                                                       <>
                                                            <div className='Profile_tab' onClick={()=>postsTab_clicked_func()}> Posts </div>
                                                            <div className='Profile_tab_underline' onClick={()=>replyTab_clicked_func()}> Replies </div>
                                                            <div className='Profile_tab' onClick={()=>likeTab_clicked_func()}> Likes </div>
                                                       </>
                                                    :
                                                        <>
                                                            <div className='Profile_tab' onClick={()=>postsTab_clicked_func()}> Posts </div>
                                                            <div className='Profile_tab' onClick={()=>replyTab_clicked_func()}> Replies </div>
                                                            <div className='Profile_tab_underline' onClick={()=>likeTab_clicked_func()}> Likes </div>
                                                        </>
                                                   }
                                                    
                                                </>
                                            }

                                        </div>

                                            {Object.keys(data).length>0 || Object.keys(likesdata).length>0?
                                                <>
                                                {/* If post part clicked */}
                                                    {   Object.keys(data).length>0 
                                                        && postTabclicked==1?
                                                    
                                                        result.map(i=>{
                                                            // console.log(i[0].likes,i[0].content );
                                                        
                                                            return typeof(i[0].replyDataId)=='undefined'?
                                                            
                                                               
                                                                <Post4 
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
                                                                        who={1}
                                                                    />
                                                            :
                                                            null
                                                            // <div className='Profile_NoTweets'>1.No Posts</div>
                                                        
        
                                                        })
                                                    
                                                     :
                                                        <>
                                                         {/* If replies part clicked */}
                                                            {   Object.keys(data).length>0 &&
                                                                replyTabclicked==1?


                                                                        result.map(i=>{
                                                                            // console.log("LIKES ARRAY B4 PASSED",i[0].likes);
                                                                        
                                                                            return typeof(i[0].replyDataId)!='undefined'?
                                                                            
                                                                    
                                                                                <Post4 
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
                                                                            :
                                                                            // <div className='Profile_NoTweets'>2.No Posts</div>
                                                                            null
                                                                        })

                                                                :
                                                                   // else like is clicked
                                                                <>
                                                                    {   postTabclicked!=1 && 
                                                                        replyTabclicked!=1 && 
                                                                        Object.keys(likesdata).length>0 ?

                                                                            likesresult.map(i=>{
                                                                                // console.log("LIKES 336"); 
                                        
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
                                                                                            who={3}
                                                                                        />                                                         
                            
                                                                            })
                                                                        :
                                                                        <>
                                                                            {/*When it enters PostTab, daat is set to 1. At that time loading is required untilldata gets updated by axios.Else:- If no posts have been tweeted, then 'No Posts' is shown..  */}
                                                                            {data==1?

                                                                                <div className='Profile_NoTweets'>Loading...</div>
                                                                                :
                                                                            
                                                                                <div className='Profile_NoTweets'>1.2No Posts</div>
                                                                           
                                                                            }
                                                                            
                                                                        </>
                                                                        
                                                                    }
                                                                    
                                                                </>
                                                            }
                                                        </> /* ⬆️ Reply tab closing bracket */
                                                    }
                                                 </> /* ⬆️ Post tab closing bracket */
                                              :   
                                                    /* ⬆️ If No Post && Likes data */
                                                    <>
                                                        {
                                                            Object.keys(data).length==0 && (postTabclicked==1 || replyTabclicked==1)?
                                                                <div className='Profile_NoTweets'>No Posts</div>
                                                            :
                                                                 <div className='Profile_NoTweets'>No Likes</div>
                                                        }
                                                        
                                                    </>
                                            }
                                        
                                                
                                                {/* result.map(i=>{
                                                    console.log(replyTabclicked);
                                                
                                                     return typeof(i[0].replyDataId)!='undefined'?
                                                    
                                            
                                                        <Post4 
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
                                                            />
                                                    :
                                                       null

                                                }) */}
                                         
                                            

                                             {/* {
                                                result.map(i=>{
                                                    console.log(typeof(i[0].replyDataId)=='undefined',i[0].content);
                                                return typeof(i[0].replyDataId)=='undefined'?
                                                      
                                                // return 
                                                <Post4 
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
                                                    />
                                                    :
                                                    null
                                                    //  <Post4 
                                                    //     key={i[0]._id}
                                                    //     id={i[0]._id}
                                                    //     Icon={Avatar}  
                                                    //     displayName={i[0].postedBy.Name}
                                                    //     username={i[0].postedBy.username}

                                                    //     originalData={i[0].originalPostedBy} //ONLY THIS PART IS DIFFERENT....DURING RETWEET, DISPLAYNAME CHANGED....

                                                    //     postText={i[0].content}
                                                    //     createdAt={i[0].createdAt}
                                                    //     // imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                                                    //     verified="True"

                                                    //     likeslength={i[0].likes.length}
                                                    //     likesData={i[0].likes}
                                                    //     retweetUserList={i[0].retweetUserList}
                                                    //     retweetData={i[0].retweetDataId}
                                                    //     replyDataId={i[0].replyDataId}
                                                    ///>
                                               
                                                })
                                              } */}

                                    </div>

                                    {/* <div>YOO</div> */}

                        </div>
                     :
                        <div className='Profile_Homepage_top'>
                            <h2>No Such User</h2>
                        </div>
                    }
                
            </div>    
         :
            null
            // <h2>No username</h2>
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