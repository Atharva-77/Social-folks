import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import { Avatar } from '@material-ui/core';
import './Profile.css'

import Post4 from './Post4';


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

   
    // console.log("PROFILE USE-SELECTOR",userInfo,userInfo.username);
   
    // console.log("PROFILE Data ",profileData,profileData=="No Such User",Object.keys(profileData).length,"Userinfo",Object.keys(userInfo).length);

    useEffect(() => 
    {
            if(id==typeof(undefined))
            {
                console.log("ID Undefined");
                setprofileData("No Such User")
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
                        // console.log("Profile RES.DATA ",(res.data));         
                        setprofileData(res.data);       
                        
                    })

                axios.get(`http://localhost:4000/post/postedBy/${id}`)
                .then(res=>
                    {
                        console.log("Posts all  RES.DATA ",(res.data));         
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
        

    }, [])

    const postsTab_clicked_func=()=>
    {
        console.log("Posts tab clicked",data);
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
                // console.log("Posts all  RES.DATA ",(res.data));         
                // setprofileData(res.data);   
                setdata(res.data);    
                
            })  
          
    }

    const replyTab_clicked_func=()=>
    {
        console.log("Replies tab clicked",data);
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

    {
        
            var result = Object.keys(data).map((key) => [data[key]]);
            // console.log("RESULTss",result,typeof(result),"\nDATA",data);
        
    }
    {
        
        var likesresult = Object.keys(likesdata).map((key) => [likesdata[key]]);
        // console.log("LikeRESULTss",likesresult,typeof(likesresult),"\nDATA",likesdata);
    
    }

  return (
    <div className='Profile_top'>
        {/* Profile pg */}
        {!loading && Object.keys(profileData).length>0 && Object.keys(data).length>0
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
                                                 {Object.keys(userInfo)==0?
                                                  <button className='Profile_follow_button'>Follow</button>
                                                 :
                                                    null
                                                 }
                                                 
                                                  {/* <button className='Profile_follow_button'>Follow</button>
                                                  <button className='Profile_following_button'>Following</button> */}
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
                                            <div className='Profile_post_tab' onClick={()=>postsTab_clicked_func()}> Posts </div>
                                            <div className='Profile_reply_tab' onClick={()=>replyTab_clicked_func()}> Replies </div>
                                        </div> */}
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
                                            {/* If post part clicked */}
                                            {postTabclicked==1?
                                            
                                                result.map(i=>{
                                                    // console.log(typeof(i[0].replyDataId)=='undefined',i[0].content);
                                                
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
   
                                                })
                                            
                                              :
                                                <>
                                                {/* If replies part clicked */}
                                                    {
                                                        replyTabclicked==1?


                                                                result.map(i=>{
                                                                    console.log("LIKES ARRAY B4 PASSED",i[0].likes);
                                                                
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
                                                                    null
                
                                                                })

                                                        :
                                                          // else like is clicked
                                                        <>
                                                            {
                                                                likesresult.map(i=>{
                                                                    // console.log(i[0]); 
                            
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
                                                            }
                                                        </>
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