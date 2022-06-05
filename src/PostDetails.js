import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import PostDetails_Replies from './PostDetails_Replies';
import Post4 from './Post4';

import { Avatar } from '@material-ui/core';
import './PostDetails.css'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { Link } from 'react-router-dom';

function PostDetails() {

    const {id}=useParams();
    var timestamp;//=timeDifference(new Date(),new Date(data.createdAt))
    const [rootId, setrootId] = useState(0); 
    const [rootData, setrootData] = useState(0); 

    const [data, setdata] = useState(0);   

    const [reload,setreload]=useState(0);

    const [repliesData, setrepliesData] = useState('');     
    // console.log("HEREEON POSTDETAILS",id,data);
    // console.log("HEREEON POSTDETAILS",id,reload,"RELIES",repliesData.length,repliesData,"Data",data);
    // setnewId(id)
// if(data!=0)
// console.log("1",id," ",data._id," ",id==data._id,id!=data._id);
// else
// console.log(id,"2",rootId);

    useEffect(() => 
        {
            console.log("ON POSTDETAILS",reload);
            axios.get(`http://localhost:4000/post/${id}`)
            .then(res=>
                {
                    // console.log(" RES.DATA ",(res.data));
                    setdata(res.data);
                    setrootId(id);
                    setrootData(res.data);
                    setreload(1);
                    
                    // timestamp=timeDifference(new Date(),new Date(data.createdAt));
                })

                axios.get(`http://localhost:4000/post/reply/${id}`)
                .then(res=>
                    {
                        // console.log(" 2.RepliesRES.DATA ",(res.data));
                        setrepliesData(res.data);
                        // setreload(0)
                        // console.log(" 3.RES.DATA ",repliesData);
                        // timestamp=timeDifference(new Date(),new Date(data.createdAt));
                    })

        }, [])

        if(data!=0 && id!=data._id)
        {
            // console.log("YOYOY");
            axios.get(`http://localhost:4000/post/${id}`)
            .then(res=>
                {
                    // console.log(" RES.DATA ",(res.data));
                    setdata(res.data);
                    setreload(0);
                    
                    // timestamp=timeDifference(new Date(),new Date(data.createdAt));
                })

                axios.get(`http://localhost:4000/post/reply/${id}`)
                .then(res=>
                    {
                        // console.log(" 2.RepliesRES.DATA ",(res.data));
                        setrepliesData(res.data);
                        // setreload(0)
                        // console.log(" 3.RES.DATA ",repliesData);
                        // timestamp=timeDifference(new Date(),new Date(data.createdAt));
                    })
        }
        // useEffect(() => 
        // {
        //     console.log("ON POSTDETAILS");
        //     axios.get(`http://localhost:4000/post/${id}`)
        //     .then(res=>
        //         {
        //             // console.log(" RES.DATA ",(res.data));
        //             setdata(res.data);
        //             // setreload(0);
                    
        //             // timestamp=timeDifference(new Date(),new Date(data.createdAt));
        //         })

        //         axios.get(`http://localhost:4000/post/reply/${id}`)
        //         .then(res=>
        //             {
        //                 console.log(" 2.RepliesRES.DATA ",(res.data));
        //                 setrepliesData(res.data);
        //                 // setreload(0)
        //                 console.log(" 3.RES.DATA ",repliesData);
        //                 // timestamp=timeDifference(new Date(),new Date(data.createdAt));
        //             })

        // }, [])


   
  return (
    <div className='PostDetail_HomePage_top'>
        {/* PostDetails {id} */}
        {data!=0
        ?
            <div>
                   <div className="PostDetail_HomePage_title">
                        <h2>Tweet</h2>
                    </div>
                   {/* {console.log("ROOTID",rootId)} */}

                   {rootData!=0 && rootId!=id?
                  
                        <div className='PostDetail'>

                            <div className="PostDetail_header">

                                <Avatar className="PostDetail_avator" src="https://d3g1bypfq0q5lj.cloudfront.net/var/www/preoffer/public/system/avatars/datas/304531/thumb250/IMG-20190416-WA0038.jpg?1587480679"/>

                                <div className="PostDetail_displayName">
                                    {/* {rootData.postedBy.Name} */}
                                    {rootData.originalPostedBy==undefined
                                     ?
                                        rootData.postedBy.Name
                                     :
                                        rootData.originalPostedBy.Name
                                     }
                                </div>
                                
                                <VerifiedUserIcon className="PostDetail_verified"/>
                                
                                <div className="PostDetail_username">
                                    {/* @{rootData.postedBy.username}  */}
                                    @{rootData.originalPostedBy==undefined
                                        ?
                                            data.postedBy.username
                                        :
                                            data.originalPostedBy.username
                                     }
                                    </div>
                                <div className='PostDetail_dot'>.</div>
                                <div className='PostDetail_date'>{timeDifference(new Date(),new Date(rootData.createdAt))}</div>
                            
                            </div>
                        
                        
                            <div className="PostDetail_text_img">
                                {/* {console.log("RETWEET",rootData.retweetContent,typeof(rootData.retweetContent)!='undefined')} */}
                                {typeof(rootData.content)!='undefined'
                                    ? <p className="PostDetail_postText">{rootData.content}</p>
                                    
                                : <div>{typeof(rootData.retweetContent)!='undefined'
                                    ?<p className="PostDetail_postText">{rootData.retweetContent}</p>
                                :
                                    <p className="PostDetail_postText">{rootData.retweetDataId.retweetContent}</p>}</div>}
                                
                            </div>

                    
                        </div>
                     :null
                    
                    }
                  {/* <Link to={`/post/${id}`} style={{ textDecoration: 'none',color:'#374151'}} onClick={() => divfun1()}> */}

                    <div className='PostDetail' id='PostDetail_header-largesize'>

                        <div className="PostDetail_header" >

                            <Avatar className="PostDetail_avator" src="https://media-exp2.licdn.com/dms/image/C4D03AQGPawx5zAoFWg/profile-displayphoto-shrink_800_800/0/1600092593879?e=1659571200&v=beta&t=0ffRoHZIbjbW2K79t0l9JnAkEnWgp2vda1MXHWhUwYs"/>

                            <div className="PostDetail_displayName" id="PostDetail-largesize">
                                {data.originalPostedBy==undefined
                                 ?
                                    data.postedBy.Name
                                 :
                                    data.originalPostedBy.Name
                                 }
                            </div>
                            
                            <VerifiedUserIcon className="PostDetail_verified"/>
                            
                            <div className="PostDetail_username" id="PostDetail-largesize">
                                @{data.originalPostedBy==undefined
                                  ?
                                    data.postedBy.username
                                 :
                                    data.originalPostedBy.username
                                 }
                                
                                </div>

                            <div className='PostDetail_dot'>.</div>
                            <div className='PostDetail_date' id="PostDetail-largesize">{timeDifference(new Date(),new Date(data.createdAt))}</div>
                        
                        </div>
                    
                    
                        <div className="PostDetail_text_img">
                            {/* {console.log("RETWEET",data.retweetContent,typeof(data.retweetContent)!='undefined')} */}
                            {typeof(data.content)!='undefined'
                                ? <p className="PostDetail_postText" id="PostDetail-postText-largesize">{data.content}</p>
                                
                            : <div>{typeof(data.retweetContent)!='undefined'
                                ?<p className="PostDetail_postText" id="PostDetail-postText-largesize">{data.retweetContent}</p>
                            :
                                <p className="PostDetail_postText" id="PostDetail-postText-largesize">{data.retweetDataId.retweetContent}</p>}</div>}
                            
                        </div>

                    
                    </div>
                 {/* </Link> */}
        
            </ div>
        
        : null}
        

            {
              <div>
                {
                //console.log(" 4.RES.DATA ",repliesData.length)
                    repliesData.length>0?
                    // <div>
                       repliesData.map(i=>{
                        // if(typeof(i[0].replyDataId)!='undefined')
                    //   console.log("i=",repliesData.length,i[0],i)
                      
                 return  <Post4 
                            key={i._id}
                            id={i._id}
                            Icon={Avatar}  
                            displayName={i.postedBy.Name}
                            username={i.postedBy.username}
                            originalData={i.originalPostedBy}
                            postText={i.content}
                            createdAt={i.createdAt}
                            // imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                             verified="True"
                            //  parentHandler={()=>parentFunc()}   

                            //  replyHandler={()=>replyFunc(i.content)}
                            // replyHandler={()=>replyFunc()}
                            // onClick={increment} 
                            // count={count} 

                             likeslength={i.likes.length}
                             likesData={i.likes}
                             retweetUserList={i.retweetUserList}
                             retweetData={i.retweetDataId}
                            //  retweetContent={i.retweetContent}
                            replyDataId={i.replyDataId}
                          />
                        
                        
                    })
                    // </div>
                    :
                    null
                }
                </div>

            }

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