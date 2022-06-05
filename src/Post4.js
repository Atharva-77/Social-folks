import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import './Post4.css'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PublishIcon from '@material-ui/icons/Publish';
import axios from 'axios';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';


function Post({id,Icon,displayName, username,originalData,postText, imageUrl, verified,createdAt,parentHandler,replyHandler,onClick, count,likeslength,likesData,retweetUserList, retweetData,replyDataId}) {
   
    // console.log("js.POST",typeof(retweetData)=='undefined',retweetUserList.length,typeof(retweetData),postText,retweetContent);
    // console.log("1.Yo",originalData,id)
    //  console.log("2.",retweetData);
    // console.log("ON POST");
    var displayname_retweet=displayName;

    if (typeof(retweetData)!='undefined') {

        // console.log("2.Ho",retweetData.content,retweetData.retweetContent,displayName);
        postText=retweetData.content || retweetData.retweetContent;

        // console.log("3.",originalData)
        // console.log("4.",retweetData);

        displayName=originalData.Name;
        username=originalData.username;
        // displayName='YO'
        // username='HI'


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

    // console.log("UserLOgin DATA",typeof(userInfo.id)!='undefined');
    if(typeof(userInfo.id)!='undefined')
    {
        // loggedIn=true;
        // console.log(userInfo.name,userInfo.username);
    }
    else
    {
        // loggedIn=false;
    }
    
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
        // link_flag=false;
        // var btn = document.getElementById("like_button");
        // console.log("btn",btn);
        // btn.onclick = function() {
        //     console.log("LIKE CLICKED");      
        //      }

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
         
            // console.log("LOD",span,document.getElementById("myTextarea").value);
         // When the user clicks on the button, open the modal
        //  btn.onClick = function() {
        //  modal.style.display = "block";      
        //  }
        // modal.style.display = "block"; 
        // params.replyHandler("Child"); 
        replyHandler("gg") ;
        }

    
        // if(cnt==1)
        // {
            //  console.log("HELLO",span);
             
            //  span.onclick = function() {
            // console.log("SPAN");
            //document.getElementById("myTextarea").value ="---";
            // modal.style.display = "none";
            // setcnt(0);
        //   }  
        // }
        // }

        // if(spanFunc==true)
        // {
        //     // document.getElementById("myTextarea").value ="--";
        //     // document.getElementById("yo").innerHTML="-";
        //     // modal.style.display = "none"; 
        //     setcnt(0);
        // }

      
        //  window.onclick = function(event) {
        //     if (event.target == modal) {
        //         console.log("2.WINDOWS",event);
        //         //document.getElementById("myTextarea").value ="Nan";
        //         modal.style.display = "none"; 
        //         // setcnt(0);
        //     }
        //     }
    
}
// console.log("COunt",cnt);
    const divfun1=()=>
    {
        div1++;
        // if()
        // directly out...div1=1, div2=0
        //2nd clicked....div2=1, div1=1

        console.log("IN DIV1",div1,div2,rep.length,document.getElementById("myTextarea").value.length);
        // if(flag==false)
        // alert('Close?');
        // else
        // flag=false;

        // var yo=document.getElementById("myTextarea").value.length;

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
        // else if(document.getElementById("myTextarea").value.length==0)
        //      setcnt(0);
        else
             flag=false;

        // var val = window.confirm("Type your text here.");
        // if (val == true) 
        // {
        // // alert("You pressed OK.");
        // } 
        // else 
        // {
        //     var val_again = window.confirm("Delete Data? Click Ok.");
        //     if(val_again==true)
        //     {
        //         alert("Deleted");
        //         setcnt(0);
        //     }
        //     // else
        //         // alert("No delete");
        //  }
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
        <div className="Post" id={id}>
 {/* {true && <Link to={`/post/${id}`} style={{ textDecoration: 'none',color:'#374151'}}> */}
 <Link to={`/post/${id}`} style={{ textDecoration: 'none',color:'#374151'}}>
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
                   {/* {console.log("LIKE FLAG",link_flag)} */}

                    <Icon className="Post_avator" src="https://media-exp2.licdn.com/dms/image/C4D03AQGPawx5zAoFWg/profile-displayphoto-shrink_800_800/0/1600092593879?e=1659571200&v=beta&t=0ffRoHZIbjbW2K79t0l9JnAkEnWgp2vda1MXHWhUwYs"/>
                    
                  

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
                                          
                {/* </Link>} */}
                </Link>
             
                
                {/* <div>
                    <button>
                        <i class="fa-regular fa-comment"></i>
                    </button>
                </div> */}
                {/* <FontAwesomeIcon icon="fa-regular fa-comment" /> */}

{/* *************************************************************************************** */}
              <div className="Post_bottomIcons">

              <button onClick={onClick}> Click me {count} </button>

                    <button id="myBtn" className='Post_icon_button' onClick={()=>reply_clicked()}> 
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

                        {/* <Icon className="Post_avator" src="https://d3g1bypfq0q5lj.cloudfront.net/var/www/preoffer/public/system/avatars/datas/304531/thumb250/IMG-20190416-WA0038.jpg?1587480679"/> */}
                        <div className='modal-closeArrow-textarea'>
                            
                            <div className='Post_header'>
                                <Icon className="Post_avator" src="https://media-exp2.licdn.com/dms/image/C4D03AQGPawx5zAoFWg/profile-displayphoto-shrink_800_800/0/1600092593879?e=1659571200&v=beta&t=0ffRoHZIbjbW2K79t0l9JnAkEnWgp2vda1MXHWhUwYs"/>
                            
                                <div className="Post_displayName">
                                    {displayName}
                                </div>
                            
                                <VerifiedUserIcon className="Post_verified"/>
                                        
                                <div className="Post_username">@{username} </div>
                                <div className='Post_dot'>.</div>
                                <div className='Post_date'>{timestamp}</div>
                            </ div>

                            <p className="modal_postText">{postText}</p>
                            {/* <hr className="bottom-border"/> */}
                            <div className="bottom-border"></div>
                            {/* <</p> */}
                            <div className='modal-reply_header'>
                                <Icon className="modal_Post_avator" />
                                <textarea className='modal-textarea' id="myTextarea" placeholder='Tweet Your Reply' value={replycontent} onChange={(e)=>setreplycontent(e.target.value)} ></textarea>
                            </div>
                        </div>
                        
                        
                        {/* <button id="postBtn" className='modal_Post_reply' onClick={()=>reply_submit_clicked()}>Post</button> */}
                  
                        {replycontent.trim().length!=0? 
                            <button id="postBtn" className='modal_Post_reply' onClick={()=>reply_submit_clicked()}>Post</button>
                            :
                            <button id="postBtn" className='modal_Post_reply_disable' >Post</button>
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
                    <button id='like_button' className='Post_icon_button' onClick={()=>like_clicked()}>
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
export default Post