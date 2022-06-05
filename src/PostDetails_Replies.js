import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import './PostDetails_Replies.css'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PublishIcon from '@material-ui/icons/Publish';
import axios from 'axios';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';


function PostDetails_Replies({id,Icon,displayName, username,originalData,postText, imageUrl, verified,createdAt,parentHandler,replyHandler,onClick, count,likeslength,likesData,retweetUserList, retweetData,replyDataId}) {
   
  
    var displayname_retweet=displayName;

    if (typeof(retweetData)!='undefined') {

        postText=retweetData.content || retweetData.retweetContent;


        displayName=originalData.Name;
        username=originalData.username;



    }
    
    var timestamp=timeDifference(new Date(),new Date(createdAt))
    // const [likeCounter, setlikeCounter] = useState(0)
    const [dataLen_Likes, setdataLen_Likes] = useState(likeslength);
    const [data_Likes,setdata_Likes] = useState(likesData);

    const [retweetLen, setretweetLen] = useState(retweetUserList.length);
    const [retweetId_data, setretweetId_data] = useState(retweetUserList);
    
    const [store, setstore] = useState("Nope");
    const [cnt, setcnt] = useState(0);

    const [reply, setreply] = useState("");
    const [replycontent, setreplycontent] = useState("");
    var rep="";

    // var cnt=0;

// const [divclick, setdivclick] = useState(1);
var div1=0;
var div2=0;//https://stackoverflow.com/questions/58252454/react-hooks-using-usestate-vs-just-variables
var flag=false;
// var link_flag=true;

    const [btnCls,setbtnCls] = useState("");
    // const [x,setx] = useState(0);
    // console.log("LIKES DATA",data_Likes,postText);
    var x=0;
    var reteweetColor=0


    

    const userLoginData = useSelector(state => state.userLoginKey)
    const {userInfo} =userLoginData

    // console.log("UserLOgin DATA",typeof(userInfo.id)!='undefined');
   
    
    if(data_Likes.includes(userInfo.id))
    {
        
        x=1;
    }
   
    else
    {
        
        x=0;
    }

    if(retweetId_data.includes(userInfo.id))
    {
        reteweetColor=1;
    }
   
    else
    {
        
        reteweetColor=0;
    }

    

    const like_clicked=()=>
    {
        

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
                    console.log("RETWEET",res.data); 
                    parentHandler();
                }
            )
            // parentHandler();
    }


    const reply_clicked=(myCloseFunction=false,myFunction=false,spanFunc=false)=>
    {
        if(cnt==0)
            setcnt(1);
        else
        setcnt(0);

        // console.log("REPLy_CNT", cnt);

        var chor="NO";
        var hi;
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        if(myCloseFunction==false && myFunction==false)
       
        {
            chor="OK";
            hi="2";
            setstore(chor);
            // var modal = document.getElementById("myModal");
            console.log("Clicked here",modal,postText,username,id,chor,store,hi,cnt);

         // Get the button that opens the modal
            var btn = document.getElementById("myBtn");
             console.log("Btn",btn);
         
         
        replyHandler("gg") ;
        }

    
      
    
}
// console.log("COunt",cnt);
    const divfun1=()=>
    {
        div1++;
       

        console.log("IN DIV1",div1,div2,rep.length,document.getElementById("myTextarea").value.length);
       
        if(flag==false && document.getElementById("myTextarea").value.length>0 )
        {
            var val = window.confirm("Do you want to Delete Data? Click Ok.");
            if (val == false) 
            {
            // alert("You pressed OK.");
            } 
            else 
            {
                var val_again = window.confirm("Confirm Delete Data? Click Ok.");
                if(val_again==true)
                {
                    alert("Deleted");
                    setreplycontent('');
                    setcnt(0);
                }
                // else
                    // alert("No delete");
             }
        }
       
        else
             flag=false;

        
    }
    const divfun2=()=>
    {
        div2++;
        flag=true;
        console.log("IN DIV2",div1,div2);
    }
    
    // console.log("REPLY CONTENT",replycontent);

    const reply_submit_clicked=()=>
    {
        console.log("Submitted",replycontent,replycontent.trim().length);
        
        const config=
        {
            headers:
            {
                'Content-Type':"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
       
        const replycontent_data=
        {
            "content":replycontent.trim(),
            "replyTo":id
        }

        axios.post(`http://localhost:4000/post/add`,replycontent_data,config)
        .then( res =>
                {
                    console.log("AXIOS:-",res.data); 
                    // console.log("PROPS.parentHandler",props.parentHandler); 
                    // props.parentHandler();
                }
            )


        setcnt(0);
        setreplycontent('');
    }
    const reply_close_clicked=()=>
    {
        console.log("Closed",replycontent);
        setcnt(0);
        setreplycontent('');
    }
    
    return (
        <div className="PostDetails_Replies" id={id}>
 {/* {true && <Link to={`/post/${id}`} style={{ textDecoration: 'none',color:'#374151'}}> */}
 <Link to={`/post/${id}`} style={{ textDecoration: 'none',color:'#374151'}}>
                {typeof(retweetData)!='undefined'
                            ?
                            <div className='icon-div-like-number'>
                                {/* <div className="icon-div-like-number"> */}
                                    <RepeatIcon fontSize="small"  className={'icon-above-avator'}/>
                                {/* </div>   */}
                                <p className="PostDetails_Replies_retweetText">Retweeted by <a href="/profile">{displayname_retweet}</a></p>
                            </div>
                            :
                             null
                }

              <div className="PostDetails_Replies_header">
                   {/* {console.log("LIKE FLAG",link_flag)} */}

                    <Icon className="PostDetails_Replies_avator" src="https://media-exp2.licdn.com/dms/image/C4D03AQGPawx5zAoFWg/profile-displayphoto-shrink_800_800/0/1600092593879?e=1659571200&v=beta&t=0ffRoHZIbjbW2K79t0l9JnAkEnWgp2vda1MXHWhUwYs"/>
                    
                  

                    <div className="PostDetails_Replies_displayName">
                        {displayName}
                    </div>
                    {/* {console.log("post mai hu ",{verified},{verified}=="True")} */}

                    {/* <div className=""> */}
                        {/* { {verified}===true? <h2>hi</h2>:<div>flase hai</div>} */}
                    <VerifiedUserIcon className="PostDetails_Replies_verified"/>
                    {/* </div> */}
                    
                    <div className="PostDetails_Replies_username">@{username} </div>
                    <div className='PostDetails_Replies_dot'>.</div>
                    <div className='PostDetails_Replies_date'>{timestamp}</div>
                
              </div>
            
            
                <div className="PostDetails_Replies_text_img">
                        <p className="PostDetails_Replies_postText">{postText}</p>
                        {/* <img className="PostDetails_Replies_img" src={imageUrl} /> */}
                </div>
                                          
                {/* </Link>} */}
                </Link>
             
                
               

{/* *************************************************************************************** */}
              <div className="PostDetails_Replies_bottomIcons">

              <button onClick={onClick}> Click me {count} </button>

                    <button id="myBtn" className='PostDetails_Replies_icon_button' onClick={()=>reply_clicked()}> 
                        <ChatBubbleOutlineIcon fontSize="small" className='icon-comment'/>
                    </button>
 {typeof(userInfo.id)!='undefined'?
   <div>
    {cnt==1?

            <div id="myModal" className="modal3" onClick={() => divfun1()}>
                 <div className="modal-content" onClick={() => divfun2()}>
                        
                        <div className='reply-closeArrowBtn'>
                              <div className='modal-reply-heading'>Reply</div>
                              <button className="closeArrowBtn" onClick={()=>reply_close_clicked()}>X</button>
                        </div>

                        {/* <Icon className="PostDetails_Replies_avator" src="https://d3g1bypfq0q5lj.cloudfront.net/var/www/preoffer/public/system/avatars/datas/304531/thumb250/IMG-20190416-WA0038.jpg?1587480679"/> */}
                        <div className='modal-closeArrow-textarea'>
                            
                            <div className='PostDetails_Replies_header'>
                                <Icon className="PostDetails_Replies_avator" src="https://media-exp2.licdn.com/dms/image/C4D03AQGPawx5zAoFWg/profile-displayphoto-shrink_800_800/0/1600092593879?e=1659571200&v=beta&t=0ffRoHZIbjbW2K79t0l9JnAkEnWgp2vda1MXHWhUwYs"/>
                            
                                <div className="PostDetails_Replies_displayName">
                                    {displayName}
                                </div>
                            
                                <VerifiedUserIcon className="PostDetails_Replies_verified"/>
                                        
                                <div className="PostDetails_Replies_username">@{username} </div>
                                <div className='PostDetails_Replies_dot'>.</div>
                                <div className='PostDetails_Replies_date'>{timestamp}</div>
                            </ div>

                            <p className="modal_postText">{postText}</p>
                            {/* <hr className="bottom-border"/> */}
                            <div className="bottom-border"></div>
                            {/* <</p> */}
                            <div className='modal-reply_header'>
                                <Icon className="modal_PostDetails_Replies_avator" />
                                <textarea className='modal-textarea' id="myTextarea" placeholder='Tweet Your Reply' value={replycontent} onChange={(e)=>setreplycontent(e.target.value)} ></textarea>
                            </div>
                        </div>
                        
                        
                        {/* <button id="postBtn" className='modal_PostDetails_Replies_reply' onClick={()=>reply_submit_clicked()}>PostDetails_Replies</button> */}
                  
                        {replycontent.trim().length!=0? 
                            <button id="postBtn" className='modal_PostDetails_Replies_reply' onClick={()=>reply_submit_clicked()}>Post</button>
                            :
                            <button id="postBtn" className='modal_PostDetails_Replies_reply_disable' >Post</button>
                        }

                        <button id="closeBtn" className='modal_Close_reply' onClick={()=>reply_close_clicked()}>Close</button>
                        
                    </div> 
             </div>
                    :
     null}
    </div>
    :
                    
    null}

{/* ********************************************************************************************* */}



                    {/* Retweet  */}
                    <button className='PostDetails_Replies_icon_button' onClick={()=>retweet_clicked()}>
    
                        <div className='icon-div-like-number'> 

                        {reteweetColor==1?<RepeatIcon fontSize="small" className={'icon-retweet-green'}/>
                            :<RepeatIcon fontSize="small" className={'icon-retweet'}/>}

                         {reteweetColor==1?<span className='icon-retweet-number'>{retweetLen || ""}</span>
                            :<span className='icon-number'>{retweetLen || ""}</span>}

                            {/* <span className='icon-like-number'>{retweetLen || ""}</span> */}

                        </div>
                        
                    </button>

                   {/* Likes Part */}
                    <button id='like_button' className='PostDetails_Replies_icon_button' onClick={()=>like_clicked()}>
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
 
              {/* </Link> */}
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
export default PostDetails_Replies
