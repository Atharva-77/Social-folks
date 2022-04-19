import React, { useState } from 'react'
import './Post.css'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PublishIcon from '@material-ui/icons/Publish';

function Post({id,Icon,displayName, username, postText, imageUrl, verified,createdAt}) {
   
    // console.log("js.POST",displayName,username);
    var timestamp=timeDifference(new Date(),new Date(createdAt))
    const [likeCounter, setlikeCounter] = useState(0)
    var x=1;

    const like_clicked=()=>
    {
        x=likeCounter;
        console.log("YO1",likeCounter,x);
        setlikeCounter(previous=>previous+1)
        console.log("YO2",likeCounter,x);

        console.log("clicked",displayName,"POSTID:-",id,username," LIKE:-",likeCounter);

        if(likeCounter%2==0)
            console.log("LIKE KARO",likeCounter);
        else
            console.log("Dislike Kyu kiya",likeCounter);
    }
    console.log("Like val",likeCounter,x);
   
    return (
        <div className="Post">

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

                    <button className='Post_icon_button'>
                        <RepeatIcon fontSize="small" className='icon-retweet'/>
                    </button>

                    <button className='Post_icon_button' onClick={()=>like_clicked(displayName)}>
                        <FavoriteBorderIcon fontSize="small" className='icon-like'/>
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
