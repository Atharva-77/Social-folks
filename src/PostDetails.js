import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import Post4 from './Post4';
import { Avatar } from '@material-ui/core';
import './PostDetails.css'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

function PostDetails() {

    const {id}=useParams();
    var timestamp;//=timeDifference(new Date(),new Date(data.createdAt))

    const [data, setdata] = useState('');   
    const [reload,setreload]=useState(0);

    useEffect(() => 
        {
            axios.get(`http://localhost:4000/post/${id}`)
            .then(res=>
                {
                    console.log(" RES.DATA ",(res.data));
                    setdata(res.data);
                    // setreload(0)
                    
                    // timestamp=timeDifference(new Date(),new Date(data.createdAt));
                })

        }, [])

        { 
            console.log("\nDATA",data.createdAt);
        }


  return (
    <div className='PostDetail_HomePage_top'>
        {/* PostDetails {id} */}
        {data!=''
        ?
            <div>
                   <div className="PostDetail_HomePage_title">
                        <h2>Tweet</h2>
                    </div>
                   
                   <div className='PostDetail'>
                    
                    

                    <div className="PostDetail_header">

                        <Avatar className="PostDetail_avator" src="https://d3g1bypfq0q5lj.cloudfront.net/var/www/preoffer/public/system/avatars/datas/304531/thumb250/IMG-20190416-WA0038.jpg?1587480679"/>
                        

                        <div className="PostDetail_displayName">
                            {data.postedBy.Name}
                        </div>
                        
                        <VerifiedUserIcon className="PostDetail_verified"/>
                        
                        <div className="PostDetail_username">@{data.postedBy.username} </div>
                        <div className='PostDetail_dot'>.</div>
                        <div className='PostDetail_date'>{timeDifference(new Date(),new Date(data.createdAt))}</div>
                    
                    </div>
                
                
                    <div className="PostDetail_text_img">
                            <p className="PostDetail_postText">{data.content}</p>
                    </div>

                    
                </div>
            
        
            </ div>
        
        : null}

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

export default PostDetails