import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import './Post.css'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PublishIcon from '@material-ui/icons/Publish';
import axios from 'axios';

function Post({id,Icon,displayName, username, postText, imageUrl, verified,createdAt,parentHandler,likeslength,likesData,retweetUserList, retweetData}) {
   
    // console.log("js.POST",typeof(retweetData)=='undefined',retweetUserList.length,typeof(retweetData),postText,retweetContent);
    console.log("Content",retweetData);
    var displayname_retweet=displayName;
    if (typeof(retweetData)!='undefined') {

        console.log("2.Content",retweetData.content,retweetData.retweetContent);
        postText=retweetData.content || retweetData.retweetContent;
        displayName=retweetData.postedBy.Name;
        username=retweetData.postedBy.username;


    }
    
    var timestamp=timeDifference(new Date(),new Date(createdAt))
    // const [likeCounter, setlikeCounter] = useState(0)
    const [dataLen_Likes, setdataLen_Likes] = useState(likeslength);
    const [data_Likes,setdata_Likes] = useState(likesData);

    const [retweetLen, setretweetLen] = useState(retweetUserList.length);
    const [retweetId_data, setretweetId_data] = useState(retweetUserList);
    




    const [btnCls,setbtnCls] = useState("");
    // const [x,setx] = useState(0);
    // console.log("LIKES DATA",data_Likes,postText);
    var x=0;
    var reteweetColor=0

    // useEffect(() => {
    //      if(x==1)
    //      {
    //          console.log("X=",x);
    //          setbtnCls("red")
    //      }
        
    //     else
    //     setbtnCls("")
     
      
    // }, [x])
    

    const userLoginData = useSelector(state => state.userLoginKey)
    const {userInfo} =userLoginData

    // console.log("UserLOgin DATA",userInfo.id,id);
    
    if(data_Likes.includes(userInfo.id))
    {
        // setx(1);
        // console.log("TRUEs ", data_Likes,postText,x);
        // setx(1);
        x=1;
        // button.addClass("active");
    }
   
    else
    {
        // setx(0);
        // console.log("False",data_Likes,userInfo.id,postText,x);
        // setx(0);
        x=0;
        // button.removeClass("active");
    }

    if(retweetId_data.includes(userInfo.id))
    {
        // setx(1);
        // console.log("RTTRUEs ", reteweetColor,retweetId_data,userInfo.id);
        // setx(1);
        reteweetColor=1;
        // button.addClass("active");
    }
   
    else
    {
        // setx(0);
        // console.log("RTFalse",reteweetColor,retweetUserList,userInfo.id);
        // setx(0);
        reteweetColor=0;
        // button.removeClass("active");
    }

    // if(x==1)
    // setbtnCls("red")
    // else
    // setbtnCls("")

    const like_clicked=()=>
    {
        // x=likeCounter;
        // console.log("B4",likeCounter,x);
        // setlikeCounter(previous=>previous+1)
        // console.log("After",likeCounter,x);

        // console.log("clicked",displayName,"POSTID:-",id,username," LIKE:-",likeCounter);

        // if(likeCounter%2==0)
        //     console.log("LIKE KARO",likeCounter);
        // else
        //     console.log("Dislike Kyu kiya",likeCounter);

        const config=
        {
            headers:
            {
                'Content-Type':"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        // console.log("POST ID",id);
       
        const postData=
         {
            "postid":id
         }

        axios.put(`http://localhost:4000/post/${id}/like`,postData,config)
        .then( res =>
                {
                    console.log("POST-LIKE-AXIOS:-",res.data.content, res.data.likes.length,res.data.likes);
                    setdataLen_Likes(res.data.likes.length);
                    setdata_Likes(res.data.likes);
                    // console.log("dataLen_Likes",dataLen_Likes); 
                }
            )
            // parentHandler();
    }
    // console.log("dataLen_Likes56",dataLen_Likes); 
    // console.log("Like val",likeCounter,x);



    const retweet_clicked=()=>
    {

        console.log("RETWEET clicked",displayName,"POSTID:-",id,username);

        const config=
        {
            headers:
            {
                'Content-Type':"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        // console.log("POST ID",id);
       
        const postData=
         {
            "postid":id
         }

        axios.post(`http://localhost:4000/post/${id}/retweet`,postData,config)
        .then( res =>
                {
                    console.log("POST-RETWEET-AXIOS:-",res.data.content, res.data.retweetUserList.length,res.data.retweetUserList);
                    setretweetLen(res.data.retweetUserList.length);
                    setretweetId_data(res.data.retweetUserList)
                    // setdata_Likes(res.data.likes);
                    // console.log("dataLen_Likes",dataLen_Likes); 
                }
            )
            parentHandler();
    }

   
    return (
        <div className="Post" id={id}>

                {typeof(retweetData)!='undefined'
                            ?
                            <div className='icon-div-like-number'>
                                {/* <div className="icon-div-like-number"> */}
                                    <RepeatIcon fontSize="small"  className={'icon-above-avator'}/>
                                {/* </div>   */}
                                <p className="Post_retweetText">Retweeted by <a href="/profile">{displayname_retweet}</a></p>
                            </div>
                            :
                             null
                }

              <div className="Post_header">
                   

                    <Icon className="Post_avator" src="https://d3g1bypfq0q5lj.cloudfront.net/var/www/preoffer/public/system/avatars/datas/304531/thumb250/IMG-20190416-WA0038.jpg?1587480679"/>
                    
                  

                    <div className="Post_displayName">
                        {displayName}
                    </div>
                    {/* {console.log("post mai hu ",{verified},{verified}=="True")} */}

                    {/* <div className=""> */}
                        {/* { {verified}===true? <h2>hi</h2>:<div>flase hai</div>} */}
                    <VerifiedUserIcon className="Post_verified"/>
                    {/* </div> */}
                    
                    <div className="Post_username">@{username} </div>
                    <div className='Post_dot'>.</div>
                    <div className='Post_date'>{timestamp}</div>
                
              </div>
            
            
                <div className="Post_text_img">
                        <p className="Post_postText">{postText}</p>
                        {/* <img className="Post_img" src={imageUrl} /> */}
                </div>
                                          
             
             
                
                {/* <div>
                    <button>
                        <i class="fa-regular fa-comment"></i>
                    </button>
                </div> */}
                {/* <FontAwesomeIcon icon="fa-regular fa-comment" /> */}

              <div className="Post_bottomIcons">

                    <button className='Post_icon_button'> 
                        <ChatBubbleOutlineIcon fontSize="small" className='icon-comment'/>
                    </button>

                    {/* Retweet  */}
                    <button className='Post_icon_button' onClick={()=>retweet_clicked()}>
    
                        <div className='icon-div-like-number'> 

                        {reteweetColor==1?<RepeatIcon fontSize="small" className={'icon-retweet-green'}/>
                            :<RepeatIcon fontSize="small" className={'icon-retweet'}/>}

                         {reteweetColor==1?<span className='icon-retweet-number'>{retweetLen || ""}</span>
                            :<span className='icon-number'>{retweetLen || ""}</span>}

                            {/* <span className='icon-like-number'>{retweetLen || ""}</span> */}

                        </div>
                        
                    </button>

                   {/* Likes Part */}
                    <button className='Post_icon_button' onClick={()=>like_clicked()}>
                        {/* <FavoriteBorderIcon fontSize="small" className={'icon-like-'+btnCls}/> */}

                        {/* If you use setx() in useeffect then lot of re-rendering was happening. Also using it in if-else before console.log causes re-rendering. Thus used terneary operator. */}
                        <div className='icon-div-like-number'> 

                           {x==1?<div>
                                    <FavoriteIcon fontSize="small" className={'icon-like-red'}/>
                                    {/* <span className='icon-like-number'>{dataLen_Likes || ""}</span> */}
                               </div>
                             :
                              <div>
                                    <FavoriteBorderIcon fontSize="small" className={'icon-like'}/>
                                    {/* <span className='icon-number'>{dataLen_Likes || ""}</span> */}
                              </div>
                            }
                       
                           {x==1?<span className='icon-like-number'>{dataLen_Likes || ""}</span>
                             :<span className='icon-number'>{dataLen_Likes || ""}</span>}

                             {/* <span className='icon-like-number'>{dataLen_Likes || ""}</span> */}

                        </div>

                        {/* In JavaScript, undefined, null, empty string and 0 all evaluate to false in a boolean context. Using || in an assignment is a way of saying "if defined, otherwise use this". */}
                    </button>

                    {/* <PublishIcon fontSize="small" /> */}
              </div>

        </div>
    )
}


function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        
        if(elapsed/1000<30)
            return 'Just now';

         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}
export default Post
