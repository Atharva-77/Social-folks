import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';

import { useParams, useLocation } from 'react-router';
import axios from 'axios';
import Post4 from './Post4';

import { Avatar } from '@material-ui/core';
import './PostDetails.css'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { Link } from 'react-router-dom';

import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { LINKURL } from './Reducers/constants/userConstants';

import { useHistory } from "react-router-dom";

function PostDetails() {

    const {id}=useParams();
    const { query } = useLocation();

    let history = useHistory(); 
    var rootsIdSpace=0;
   
    // console.log(id, "HI ", query);
    // console.log("ID in PD.js",id);
    var timestamp;//=timeDifference(new Date(),new Date(data.createdAt))
    const [rootId, setrootId] = useState(0); 
    const [rootData, setrootData] = useState(0); 

    const [data, setdata] = useState(0);   

    const [reload,setreload]=useState(0);

    const [repliesData, setrepliesData] = useState('');

    const [rootData_RetweetId, setrootData_RetweetId] = useState('');
    const [rootDataLen_RetweetId, setrootDataLen_RetweetId] = useState(0);
    const [rootData_Likes,setrootData_Likes] = useState('');
    const [rootDataLen_Likes, setrootDataLen_Likes] = useState(0);

    const [data_RetweetId, setdata_RetweetId] = useState('');
    const [dataLen_RetweetId, setdataLen_RetweetId] = useState(0);
    const [data_Likes,setdata_Likes] = useState('');
    const [dataLen_Likes, setdataLen_Likes] = useState(0);
    
    const [rootCntModal, setrootCntModal] = useState(0);
    const [cnt, setcnt] = useState(0);

    const [replycontent, setreplycontent] = useState("");
    const [frmPostBack, setfrmPostBack] = useState(0);


    var Rx=0;
    var rootReteweetColor=0;
    var flag=false;
    var rootFlag = false;
    
    var x=0;
    var reteweetColor=0;

    const userLoginData = useSelector(state => state.userLoginKey)
    const {userInfo} =userLoginData


    // console.log("HEREEON POSTDETAILS",id,data);
    // console.log("HEREEON POSTDETAILS",id,reload,"RELIES",repliesData.length,repliesData,"Data",data);
    // setnewId(id)
// if(data!=0)
// console.log("1",id," ",data._id," ",id==data._id,id!=data._id);
// else
// console.log(id,"2",rootId);

// ROOT DATA
   if(rootData_Likes.includes(userInfo.id))
    {
        
        Rx=1;
        // console.log("RX TRIGGERED",Rx,rootData_Likes);
    }
   
    else
    {
        
        Rx=0;
    }

    if(rootData_RetweetId.includes(userInfo.id))
    {
        rootReteweetColor=1;
    }
   
    else
    {
        rootReteweetColor=0;
    }


//NOT ROOT DATA
    if(data_Likes.includes(userInfo.id))
    {
        
        x=1;
        // console.log("X TRIGGERED",x,data_Likes);
    }
   
    else
    {
        
        x=0;
    }

    if(data_RetweetId.includes(userInfo.id))
    {
        reteweetColor=1;
    }
   
    else
    {
        reteweetColor=0;
    }


    useEffect(() => 
        {
            // console.log("ON POSTDETAILS",reload);
            // if(query!=undefined)
            // {
                axios.get(`${LINKURL}/post/${id}`)
                .then(res=>
                    {
                        // console.log(" 111111111111111111111111111RES.DATA ",(res.data),query);
                        setdata(res.data);
                        setrootId(id);
                        setrootData(res.data);
                        // rootsIdSpace=1;
    
    
                        setrootData_Likes(res.data.likes);
                        setrootDataLen_Likes(res.data.likes.length);
    
                        setdata_Likes(res.data.likes);
                        setdataLen_Likes(res.data.likes.length);
    
    
                        setrootData_RetweetId(res.data.retweetUserList);
                        setrootDataLen_RetweetId(res.data.retweetUserList.length);
    
                        setdata_RetweetId(res.data.retweetUserList); 
                        setdataLen_RetweetId(res.data.retweetUserList.length);
                        // timestamp=timeDifference(new Date(),new Date(data.createdAt));
                    })
    
                    axios.get(`${LINKURL}/post/reply/${id}`)
                    .then(res=>
                        {
                            // console.log(" 2.RepliesRES.DATA ",(res.data));
                            setrepliesData(res.data);
                            // setreload(0)
                            // console.log(" 3.RES.DATA ",repliesData);
                            // timestamp=timeDifference(new Date(),new Date(data.createdAt));
                        })
            //  }

             if (query==undefined)
             {
                setfrmPostBack(1);
             }
          

        }, [])

        useEffect(()=>
        {
            // console.log("id changeddd",id);
            console.log("145 YOYOY---------------------------------------------------", query,"\n\nDATA",data,"\n\nid",id);

            if (data != 0 && id != data._id) 
            {
                console.log("155 YOYOY---------------------------------------------------", query);

                      //If The root tweet is "Replying to", then there is an option of 'Link to Full tweet'. When this is cicked, it take to a tweet. So that tweet should become rootTweet . Hence rootTweet is reassigned.
                    if (query == 1 || (query== undefined && frmPostBack==1)) 
                     {
                            axios.get(`${LINKURL}/post/${id}`)
                                .then(res => {
                                    // console.log(" DATAAAAAAAAAAAAAAAA RES.DATA ", (res.data));
                                    setdata(res.data);
                                    setrootId(id);
                                    setrootData(res.data);
                                    

                                    setrootData_Likes(res.data.likes);
                                    setrootDataLen_Likes(res.data.likes.length);

                                    setdata_Likes(res.data.likes);
                                    setdataLen_Likes(res.data.likes.length);


                                    setrootData_RetweetId(res.data.retweetUserList);
                                    setrootDataLen_RetweetId(res.data.retweetUserList.length);

                                    setdata_RetweetId(res.data.retweetUserList);
                                    setdataLen_RetweetId(res.data.retweetUserList.length);
                                    // timestamp=timeDifference(new Date(),new Date(data.createdAt));
                                    setreload(0)
                                })

                            axios.get(`${LINKURL}/post/reply/${id}`)
                                .then(res => {
                                    // console.log(" 2.2222222222222222222222RepliesRES.DATA ",(res.data));
                                    setrepliesData(res.data);
                                    // setreload(0)
                                    // console.log(" 3.RES.DATA ",repliesData);
                                    // timestamp=timeDifference(new Date(),new Date(data.createdAt));
                                    // setreload(0);
                                })
                        }

                    else if(query==0 || (query==undefined && frmPostBack==0))
                    {
                            axios.get(`${LINKURL}/post/${id}`)
                                .then(res => {
                                    rootsIdSpace=1;
                                    console.log(" 160R0000000000000000000000000000000000ES.DATA ", (res.data),rootsIdSpace);
                                    setdata(res.data);
                                    setreload(0);
                                   

                                    setdata_RetweetId(res.data.retweetUserList);
                                    setdataLen_RetweetId(res.data.retweetUserList.length);

                                    setdata_Likes(res.data.likes);
                                    setdataLen_Likes(res.data.likes.length);
                                    // timestamp=timeDifference(new Date(),new Date(data.createdAt));
                                    // setreload(0)
                                })

                            axios.get(`${LINKURL}/post/reply/${id}`)
                                .then(res => {
                                    console.log(" 242222222222222222222222222222222222222222222.RepliesRES.DATA ",(res.data));
                                    setrepliesData(res.data);
                                    // setreload(0)
                                    // console.log(" 3.RES.DATA ",repliesData);
                                    // timestamp=timeDifference(new Date(),new Date(data.createdAt));
                                })
                     }

                     


            }

            else if(data != 0 && id == data._id)
            {
                console.log("259...................................ELSLELSE",query,frmPostBack);
                if((query==0 && frmPostBack==0)||(query==undefined && frmPostBack==0))
                {
   

                        axios.get(`${LINKURL}/post/reply/${id}`)
                            .then(res => {
                                console.log(" 2427777777777777777777777777777777777.RepliesRES.DATA ",(res.data));
                                setrepliesData(res.data);
                                setreload(0)
                                // console.log(" 3.RES.DATA ",repliesData);
                                // timestamp=timeDifference(new Date(),new Date(data.createdAt));
                            })
                 }
            }
        },[id,reload,setreload])


        // if(data!=0 && id!=data._id)
        //  {
        //           console.log("155 YOYOY---------------------------------------------------", query);

        //             //If The root tweet is "Replying to", then there is an option of 'Link to Full tweet'. When this is cicked, it take to a tweet. So that tweet should become rootTweet . Hence rootTweet is reassigned.
        //         if(query==1)
        //            {
        //                 axios.get(`${LINKURL}/post/${id}`)
        //                     .then(res => {
        //                         console.log(" DATAAAAAAAAAAAAAAAA RES.DATA ", (res.data));
        //                         setdata(res.data);
        //                         setrootId(id);
        //                         setrootData(res.data);


        //                         setrootData_Likes(res.data.likes);
        //                         setrootDataLen_Likes(res.data.likes.length);

        //                         setdata_Likes(res.data.likes);
        //                         setdataLen_Likes(res.data.likes.length);


        //                         setrootData_RetweetId(res.data.retweetUserList);
        //                         setrootDataLen_RetweetId(res.data.retweetUserList.length);

        //                         setdata_RetweetId(res.data.retweetUserList);
        //                         setdataLen_RetweetId(res.data.retweetUserList.length);
        //                         // timestamp=timeDifference(new Date(),new Date(data.createdAt));
        //                     })

        //                 axios.get(`${LINKURL}/post/reply/${id}`)
        //                     .then(res => {
        //                         // console.log(" 2.RepliesRES.DATA ",(res.data));
        //                         setrepliesData(res.data);
        //                         // setreload(0)
        //                         // console.log(" 3.RES.DATA ",repliesData);
        //                         // timestamp=timeDifference(new Date(),new Date(data.createdAt));
        //                     })
        //             }

        //             else
        //             {
        //                 axios.get(`${LINKURL}/post/${id}`)
        //                     .then(res => {
        //                         console.log(" 160RES.DATA ", (res.data));
        //                         setdata(res.data);
        //                         setreload(0);

        //                         setdata_RetweetId(res.data.retweetUserList);
        //                         setdataLen_RetweetId(res.data.retweetUserList.length);

        //                         setdata_Likes(res.data.likes);
        //                         setdataLen_Likes(res.data.likes.length);
        //                         // timestamp=timeDifference(new Date(),new Date(data.createdAt));
        //                     })

        //                 axios.get(`${LINKURL}/post/reply/${id}`)
        //                     .then(res => {
        //                         // console.log(" 2.RepliesRES.DATA ",(res.data));
        //                         setrepliesData(res.data);
        //                         // setreload(0)
        //                         // console.log(" 3.RES.DATA ",repliesData);
        //                         // timestamp=timeDifference(new Date(),new Date(data.createdAt));
        //                     })
        //             }

                
        // }
       
        const parentFuncPd=()=>
        {
            console.log("clicked");
            setreload(1);
            // alert("Button clicked")
        }
        const retweet_clicked=(retweetSubmitId='')=>
        {
    
            console.log("RETWEET clicked");
    
            const config=
            {
                headers:
                {
                    'Content-Type':"application/json",
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
           
            const postData=
             {
                "postid":retweetSubmitId
             }
    

             if(id==rootId && rootId== retweetSubmitId)
             {
                 console.log("1st pg",retweetSubmitId);
 
                 axios.post(`${LINKURL}/post/${retweetSubmitId}/retweet`,postData,config)
                 .then( res =>
                         {
                             console.log("POSTDetails-Retweet-AXIOS:-",res.data, res.data.retweetUserList);
                             setdataLen_RetweetId(res.data.retweetUserList.length);
                             setdata_RetweetId(res.data.retweetUserList);
 
                            //  setdataLen_Likes(res.data.likes.length);
                            //  setdata_Likes(res.data.likes);
                         }
                     )
 
             }
             else if(rootId==retweetSubmitId)
             {
                 console.log("2nd Pg+ RootId",rootData_Likes);
                 console.log("2.",data_Likes);
                
                 axios.post(`${LINKURL}/post/${retweetSubmitId}/retweet`,postData,config)
                 .then( res =>
                         {
                             // console.log("POSTDetails-LIKE-AXIOS:-",res.data.content, res.data.likes.length,res.data.likes);
                             setrootDataLen_RetweetId(res.data.retweetUserList.length);
                             setrootData_RetweetId(res.data.retweetUserList);
                             
                            //  setrootDataLen_Likes(res.data.likes.length);
                            //  setrootData_Likes(res.data.likes);
 
                             // setdataLen_Likes(res.data.likes.length);
                             // setdata_Likes(res.data.likes);
                         }
                     )
             }
             else
             {
                 console.log("3rd pg+ id-likeid");
                 axios.post(`${LINKURL}/post/${retweetSubmitId}/retweet`,postData,config)
                 .then( res =>
                         {
                             // console.log("POSTDetails-LIKE-AXIOS:-",res.data.content, res.data.likes.length,res.data.likes);
                             // setrootDataLen_Likes(res.data.likes.length);
                             // setrootData_Likes(res.data.likes);
                             setdataLen_RetweetId(res.data.retweetUserList.length);
                             setdata_RetweetId(res.data.retweetUserList);

                            //  setdataLen_Likes(res.data.likes.length);
                            //  setdata_Likes(res.data.likes);
                         }
                     )
             }

            // axios.post(`${LINKURL}/post/${retweetSubmitId}/retweet`,postData,config)
            // .then( res =>
            //         {
            //             console.log("POST-RETWEET-AXIOS:-",res.data.content, res.data.retweetUserList.length,res.data.retweetUserList);
            //             setdataLen_RetweetId(res.data.retweetUserList.length);
            //             setdata_RetweetId(res.data.retweetUserList)
            //             // setdata_Likes(res.data.likes);
            //             console.log("RETWEET",res.data); 
            //             // parentHandler();
            //         }
            //     )
        }

        const like_clicked=(likeSubmitId='')=>
        {
            //1st time both len because..2nd rendered on 1st pg...for further we need 1st.
            console.log("Like clicked",likeSubmitId,id);

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
                "postid":likeSubmitId
            }
            if(id==rootId && rootId== likeSubmitId)
            {
                console.log("1st pg");

                axios.put(`${LINKURL}/post/${likeSubmitId}/like`,postData,config)
                .then( res =>
                        {
                            // console.log("POSTDetails-LIKE-AXIOS:-",res.data.content, res.data.likes.length,res.data.likes);
                            console.log("Likes clicked axions");
                            setrootDataLen_Likes(res.data.likes.length);
                            setrootData_Likes(res.data.likes);

                            setdataLen_Likes(res.data.likes.length);
                            setdata_Likes(res.data.likes);
                        }
                    )

            }
            else if(rootId==likeSubmitId)
            {
                console.log("2nd Pg+ RootId",rootData_Likes);
                console.log("2.",data_Likes);
               
                axios.put(`${LINKURL}/post/${likeSubmitId}/like`,postData,config)
                .then( res =>
                        {
                            // console.log("POSTDetails-LIKE-AXIOS:-",res.data.content, res.data.likes.length,res.data.likes);
                            console.log("2.Likes clicked axions");
                            setrootDataLen_Likes(res.data.likes.length);
                            setrootData_Likes(res.data.likes);

                            // setdataLen_Likes(res.data.likes.length);
                            // setdata_Likes(res.data.likes);
                        }
                    )
            }
            else
            {
                console.log("3rd pg+ id-likeid");
                axios.put(`${LINKURL}/post/${likeSubmitId}/like`,postData,config)
                .then( res =>
                        {
                            // console.log("POSTDetails-LIKE-AXIOS:-",res.data.content, res.data.likes.length,res.data.likes);
                            // setrootDataLen_Likes(res.data.likes.length);
                            // setrootData_Likes(res.data.likes);
                            console.log("3.Likes clicked axions");
                            setdataLen_Likes(res.data.likes.length);
                            setdata_Likes(res.data.likes);
                        }
                    )
            }
            // if(likeSubmitId==rootId)
            // {
            //     setdataLen_Likes(res.data.likes.length);
            //     setdata_Likes(res.data.likes);
            // }
            // else
            // {
            //     setdataLen_Likes(res.data.likes.length);
            //     setdata_Likes(res.data.likes);
            // }
            
            //1
            // axios.put(`${LINKURL}/post/${likeSubmitId}/like`,postData,config)
            // .then( res =>
            //         {
            //             console.log("POSTDetails-LIKE-AXIOS:-",res.data.content, res.data.likes.length,res.data.likes);
            //             setdataLen_Likes(res.data.likes.length);
            //             setdata_Likes(res.data.likes);
            //         }
            //     )    
                // parentHandler();
        }


        const reply_clicked=()=>
        {
            // console.log("REPLYYPOST");
                if(cnt==0)
                    setcnt(1);
                else
                setcnt(0);
            
        }

        
// console.log("COunt",cnt);
    const divfun1=()=>
    {
       

        console.log("IN DIV1",flag,document.getElementById("myTextarea").value.length);
       
        if (flag == false && document.getElementById("myTextarea").value.length == 0)
            setcnt(0);


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
        // div2++;
        flag=true;
        console.log("IN DIV2");
    }


    const reply_submit_clicked=(replySubmitId='')=>
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
            "replyTo":replySubmitId
        }

        axios.post(`${LINKURL}/post/add`,replycontent_data,config)
        .then( res =>
                {
                    console.log("AXIOS:-",res.data); 
                    // console.log("PROPS.parentHandler",props.parentHandler); 
                    // props.parentHandler();
                    
                    axios.get(`${LINKURL}/post/reply/${id}`)
                    .then(res=>
                        {
                            console.log(" 2.RepliesRES.DATA ",(res.data));
                            setrepliesData(res.data);
                            // setreload(0)
                            // console.log(" 3.RES.DATA ",repliesData);
                            // timestamp=timeDifference(new Date(),new Date(data.createdAt));
                        })

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
    


    //-------------ROOT MODALS----------------------------------------------------------------------- 
   // ---------------------------------------------------------------------------------------------------------
    const root_reply_clicked = () => {
        // console.log("REPLYYPOST");
        if (rootCntModal == 0)
            setrootCntModal(1);
        else
            setrootCntModal(0);

    }
    const divfun1_root = () => {


        // console.log("IN DIV1", rootFlag, document.getElementById("root_myTextarea").value.length);

        if (rootFlag == false && document.getElementById("root_myTextarea").value.length == 0)
            setrootCntModal(0);


        if (rootFlag == false && document.getElementById("root_myTextarea").value.length > 0) {
            var val = window.confirm("Do you want to Delete Data? Click Ok.");
            if (val == false) {
                // alert("You pressed OK.");
            }
            else {
                var val_again = window.confirm("Confirm Delete Data? Click Ok.");
                if (val_again == true) {
                    alert("Deleted");
                    setreplycontent('');
                    setrootCntModal(0);
                }
                // else
                // alert("No delete");
            }
        }

        else
            rootFlag = false;


    }
    const divfun2_root = () => {
        // div2++;
        rootFlag = true;
        console.log("IN DIV2");
    }


    const root_reply_submit_clicked = (replySubmitId = '') => {
        console.log("Submitted", replycontent, replycontent.trim().length);

        const config =
        {
            headers:
            {
                'Content-Type': "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const replycontent_data =
        {
            "content": replycontent.trim(),
            "replyTo": replySubmitId
        }

        axios.post(`${LINKURL}/post/add`, replycontent_data, config)
            .then(res => {
                console.log("AXIOS:-", res.data);
                // console.log("PROPS.parentHandler",props.parentHandler); 
                // props.parentHandler();

                axios.get(`${LINKURL}/post/reply/${id}`)
                    .then(res => {
                        console.log(" 2.RepliesRES.DATA ", (res.data));
                        setrepliesData(res.data);
                        // setreload(0)
                        // console.log(" 3.RES.DATA ",repliesData);
                        // timestamp=timeDifference(new Date(),new Date(data.createdAt));
                    })

            }
            )



        setrootCntModal(0);
        setreplycontent('');
    }
    const root_reply_close_clicked = () => {
        console.log("Closed", replycontent);
        setrootCntModal(0);
        setreplycontent('');
    }


    
  return (
    <div className='PostDetail_HomePage_top'>
        {/* PostDetails {id} */}
        {data!=0
         ?
            <div>
                   <div className="PostDetail_HomePage_title">
                        <h2 className='Tweet-heading'>Posts</h2>
                    </div>
                   {/* {console.log("ROOTID",rootId,id,data)} */}

                        {rootData!=0 && rootId!=id?
                  
                             <div className='PostDetail'>
                                <div className='RootPost_title'>Root Post</div>
                                        {rootData.retweetDataId!=undefined
                                         ?
                                                <div className='PostDetail_retweetText-header'>
                                                    <p className="PostDetail_retweetText" id='PostDetail-retweetby'>Retweeted by <a href="/profile">{rootData.postedBy.Name}</a></p>
                                                    <p className="PostDetail_retweetText">New Post of <a href="/profile">{rootData.postedBy.Name}</a></p>
                                                </div>
                                         :
                                            null
                                        }
                                        
                                        {rootData.replyDataId != undefined &&

                                            <div className='PostDetail_replyingTo_header'>

                                                <span className='PostDetail_replyingTo-title'>Replying to </span>
                                                <span className='PostDetail_replyingTo-name'>@{rootData.replyDataId.postedBy.Name}</span>

                                                <div className='PostDetail_fullTweet_header'>
                                                     <span className='PostDetail_fullTweet-title'>
                                                          <Link to={{ pathname: `/post/${rootData.replyDataId._id}`, query: 1 }} style={{ textDecoration: 'none', color: 'gray' }} >Link to Full Tweet</Link> 
                                                          <Link to={{ pathname: `/post/${rootData.replyDataId._id}`, query: 1 }} style={{ textDecoration: 'underline', color: '#1da1f2' }}> here </Link>
                                                      </span>
                                                </div>

                                            </div>
                                        }   

                                         <Link to={{ pathname: `/post/${rootId}`, query: 0}} style={{ textDecoration: 'none',color:'#374151'}}>
                                               
                                                <div className="PostDetail_header">

                                                        {/* <Avatar className="PostDetail_avator" src="https://d3g1bypfq0q5lj.cloudfront.net/var/www/preoffer/public/system/avatars/datas/304531/thumb250/IMG-20190416-WA0038.jpg?1587480679"/> */}
                                                        {rootData.originalPostedBy == undefined
                                                            ?
                                                            <Avatar className="PostDetail_avator" src={`${rootData.postedBy.profilePicUrl}`} />
                                                            :
                                                            <Avatar className="PostDetail_avator" src={`${rootData.originalPostedBy.profilePicUrl}`} />
                                                            // <h2>Orgp</h2>
                                                        }
                                                        <div className="PostDetail_displayName">
                                                            
                                                            {rootData.originalPostedBy==undefined
                                                             ?
                                                                <Link to={`/profile/${rootData.postedBy.username}`} style={{ textDecoration: 'none',color:'#374151'}}>
                                                                    {rootData.postedBy.Name}
                                                                </Link>
                                                             :
                                                                <Link to={`/profile/${rootData.originalPostedBy.username}`} style={{ textDecoration: 'none',color:'#374151'}}>
                                                                    {rootData.originalPostedBy.Name}
                                                                </Link>
                                                                
                                                                // <h2>Orgp</h2>
                                                            }
                                                        </div>
                                                    
                                                        <VerifiedUserIcon className="PostDetail_verified"/>
                                                    
                                                        <div className="PostDetail_username">
                                                            {/* @{rootData.postedBy.username}  */}
                                                            @{rootData.originalPostedBy==undefined
                                                                ?
                                                                    <Link to={`/profile/${rootData.postedBy.username}`} style={{ textDecoration: 'none',color:'#374151'}}>
                                                                        {rootData.postedBy.username}
                                                                    </Link>
                                                                    
                                                                :
                                                                    <Link to={`/profile/${rootData.originalPostedBy.username}`} style={{ textDecoration: 'none',color:'#374151'}}>
                                                                        {rootData.originalPostedBy.username}
                                                                    </Link>
                                                                    
                                                            }
                                                            
                                                        </div>
                                                        
                                                         <div className='PostDetail_dot'>.</div>
                                                         <div className='PostDetail_date'>{timeDifference(new Date(),new Date(rootData.createdAt))}</div>
                                            
                                                </div>
                                
                                
                                                <div className="PostDetail_text_img">
                                                    {/* {console.log("RETWEET",rootData.retweetContent,typeof(rootData.retweetContent)!='undefined')} */}
                                                    
                                                    {typeof(rootData.content)!='undefined'
                                                    ? <p className="PostDetail_postText"> {rootData.content}</p>
                                                        
                                                    : 
                                                    <div>
                                                            {
                                                                typeof(rootData.retweetContent)!='undefined'
                                                                ?
                                                                <p className="PostDetail_postText">{rootData.retweetContent}</p>
                                                                :
                                                                <p className="PostDetail_postText"> {rootData.retweetDataId.retweetContent}</p>
                                                            }
                                                        </div>
                                                    }
                                                
                                                </div>
                                          </Link>

                                    {/* Bottom ICONS */}
                                     <div className="PostDetail_bottomIcons">

                                             {/* Comment Button */}
                                            {/* <button id="myBtn" className='PostDetail_icon_button' onClick={()=>root_reply_clicked()}> 
                                                <ChatBubbleOutlineIcon fontSize="small" className='icon-comment'/>
                                            </button> */}
                                            <button id="myBtn" className='PostDetail_icon_button' onClick={()=>root_reply_clicked()}>

                                                <div className='icon-div-like-number'>
                                                    <ChatBubbleOutlineIcon fontSize="small" className='icon-comment'/>

                                                    {userInfo != undefined && typeof (userInfo.id) != 'undefined'
                                                        ?
                                                        <span className='icon-comment-number'>{rootData.totalReplies}</span>
                                                        :
                                                        <span className='icon-number'>{rootData.totalReplies}</span>
                                                    }
                                                </div>

                                            </button>
                                                
                                                {/* -------------------1ST MODAL ------------------------------------------------------------------ */}
                                            {/*When 1st Modal Open  */}
                                                  {/* {console.log("/")} */}
                                            {typeof(userInfo.id)!='undefined'
                                             ?
                                                <>
                                                    {rootCntModal==1?

                                                         <div id="myModal" className="modal3" onClick={() => divfun1_root()}>
                                                                <div className="modal-content" onClick={() => divfun2_root()}>
                                                                    
                                                                        <div className='reply-closeArrowBtn'>
                                                                            <div className='modal-reply-heading'>Reply</div>
                                                                            <button className="closeArrowBtn" onClick={()=>root_reply_close_clicked()}>X</button>
                                                                        </div>

                                                                        <div className='modal-closeArrow-textarea'>
                                                                            
                                                                                        <div className='PostDetail_header_modal'>
                                                                                                
                                                                                                 {/* <Avatar className="PostDetail_avator" src="https://media-exp2.licdn.com/dms/image/C4D03AQGPawx5zAoFWg/profile-displayphoto-shrink_800_800/0/1600092593879?e=1659571200&v=beta&t=0ffRoHZIbjbW2K79t0l9JnAkEnWgp2vda1MXHWhUwYs"/> */}
                                                                                            {rootData.originalPostedBy == undefined
                                                                                                ?
                                                                                                <Avatar className="PostDetail_avator" src={`${rootData.postedBy.profilePicUrl}`} />
                                                                                                :
                                                                                                <Avatar className="PostDetail_avator" src={`${rootData.originalPostedBy.profilePicUrl}`} />
                                                                                                // <h2>Orgp</h2>
                                                                                            }
                                                                                        <div className="PostDetail_displayName">
                                                                                            {rootData.originalPostedBy==undefined
                                                                                                ?
                                                                                                    rootData.postedBy.Name
                                                                                                :
                                                                                                    rootData.originalPostedBy.Name
                                                                                            }
                                                                                        </div>
                                                                                    
                                                                                        <VerifiedUserIcon className="PostDetail_verified"/>
                                                                                                
                                                                                        <div className="PostDetail_username">
                                                                                            @{rootData.originalPostedBy==undefined
                                                                                                ?
                                                                                                    rootData.postedBy.username
                                                                                                :
                                                                                                    rootData.originalPostedBy.username
                                                                                            }
                                                                                        </div>
                                                                                        <div className='PostDetail_dot'>.</div>
                                                                                        <div className='PostDetail_date'>{timeDifference(new Date(),new Date(data.createdAt))}</div>
                                                                                   </ div>

                                                                                    {/* <p className="modal_postText">{rootData.content}</p> */}
                                                                                    {console.log("ROOT C",rootData)}
                                                                                    
                                                                                    <div >
                                                                                        {/* {console.log("RETWEET",rootData.retweetContent,typeof(rootData.retweetContent)!='undefined')} */}

                                                                                        {typeof (rootData.content) != 'undefined'
                                                                                            ? <p className="modal_postText"> {rootData.content}</p>

                                                                                            :
                                                                                            <div>
                                                                                                {
                                                                                                    typeof (rootData.retweetContent) != 'undefined'
                                                                                                        ?
                                                                                                        <p className="modal_postText">{rootData.retweetContent}</p>
                                                                                                        :
                                                                                                        <p className="modal_postText"> {rootData.retweetDataId.retweetContent}</p>
                                                                                                }
                                                                                            </div>
                                                                                        }

                                                                                    </div>

                                                                                    <div className="bottom-border"></div>
                                                                                
                                                                                        <div className='modal-reply_header'>
                                                                                            <Avatar className="modal_PostDetail_avator" />
                                                                                            <textarea className='modal-textarea' id="root_myTextarea" placeholder='Tweet Your Reply' value={replycontent} onChange={(e)=>setreplycontent(e.target.value)} ></textarea>
                                                                                        </div>

                                                                        </div>
                                                                    
                                                                    
                                                                
                                                                        {replycontent.trim().length!=0? 
                                                                            <button id="postBtn" className='modal_PostDetail_reply' onClick={()=>root_reply_submit_clicked(rootId)}>Post</button>
                                                                            :
                                                                            <button id="postBtn" className='modal_PostDetail_reply_disable' >Post</button>
                                                                        }

                                                                         <button id="closeBtn" className='modal_Close_reply' onClick={()=>root_reply_close_clicked()}>Close</button>
                                                                    
                                                                </div> 
                                                           </div>
                                                    :
                                                    null}
                                                </>
                                             :    
                                             null}

                                            {/* ************************************ 1ST Modal close ********************************************************* */}



                                            {/* 1st Retweet  */}
                                             <button className='PostDetail_icon_button' onClick={()=>retweet_clicked(rootId)}>

                                                <div className='icon-div-like-number'> 

                                                    {rootReteweetColor==1
                                                    ?
                                                        <RepeatIcon fontSize="small" className={'icon-retweet-green'}/>
                                                    :
                                                        <RepeatIcon fontSize="small" className={'icon-retweet'}/>
                                                    }

                                                    {rootReteweetColor==1
                                                    ?
                                                        <span className='icon-retweet-number'>{rootDataLen_RetweetId || ""}</span>
                                                    :
                                                        <span className='icon-number'>{rootDataLen_RetweetId || ""}</span>
                                                    }


                                                </div>
                                                
                                            </button>

                                           {/* 1st Likes Part  */}
                                            <button id='like_button' className='PostDetail_icon_button' onClick={()=>like_clicked(rootId)}>
                                                

                                                <div className='icon-div-like-number'> 
                                                {/* <h1>HI1</h1> */}

                                                    {Rx==1?
                                                        <div>
                                                                <FavoriteIcon fontSize="small" className={'icon-like-red'}/>
                                                        </div>
                                                        :
                                                        <div>
                                                                <FavoriteBorderIcon fontSize="small" className={'icon-like'}/>
                                                        </div>
                                                    }
                                                   yo 
                                                   {/* {console.log("ROOT LIKES LEN",rootDataLen_Likes)} */}
                                                    {Rx==1?
                                                        <span className='icon-like-number'>{rootDataLen_Likes || ""}</span>
                                                        :
                                                        <span className='icon-number'>{rootDataLen_Likes || ""}</span>
                                                    }


                                                </div>

                                            </button> 

                                    </div>               
                    
                            </div>
                         :
                         null
                        }

                        {/* <div className='Line'></div> */}
                       
                        
                                {rootData!=0 && rootId!=id
                                 ?
                                     <div>&nbsp;</div> 
                                 :
                                    null
                                }
                      {/*==================================================================================================================  */}
                         {/*==========================2nd PART========================================================================================  */}
                        {/* <Link to={`/post/${id}`} style={{ textDecoration: 'none',color:'#374151'}} onClick={() => divfun1()}> */}
                                {/* 2nd partt */}
                        <div className='PostDetailTwo' id='PostDetail_header-largesize'>
                          
                                {data.retweetDataId!=undefined
                                    ?
                                        <div >
                                                <p className="PostDetail_retweetText" id='PostDetail-retweetby'>Retweeted by <a href="/profile">{data.postedBy.Name}</a></p>
                                                <p className="PostDetail_retweetText">New Post of <a href="/profile">{data.postedBy.Name}</a></p>
                                        </div>
                                    :
                                    null
                                }
                                {data.replyDataId != undefined &&

                                    <div className='PostDetail_replyingTo_header'>

                                        <span className='PostDetail_replyingTo-title'>Replying to </span>
                                        <span className='PostDetail_replyingTo-name'>@{data.replyDataId.postedBy.Name}</span>

                                        <div className='PostDetail_fullTweet_header'>
                                            <span className='PostDetail_fullTweet-title'>
                                                <Link to={{ pathname: `/post/${data.replyDataId._id}`, query: 1 }} style={{ textDecoration: 'none', color: 'gray' }} >Link to Full Tweet</Link>
                                                <Link to={{ pathname: `/post/${data.replyDataId._id}`, query: 1 }} style={{ textDecoration: 'underline', color: '#1da1f2' }} > here </Link>
                                            </span>
                                        </div>

                                    </div>
                                }   

                                <div className="PostDetail_header" >
                                
                                             {/* <Avatar className="PostDetail_avator" src={`${data.postedBy.profilePicUrl}`}/> */}
                                         {data.originalPostedBy==undefined
                                             ?
                                                 <Avatar className="PostDetail_avator" src={`${data.postedBy.profilePicUrl}`}/>
                                             :
                                                <Avatar className="PostDetail_avator" src={`${data.originalPostedBy.profilePicUrl}`}/>
                                                // <h2>Orgp</h2>
                                          }
                                    <div className="PostDetail_displayName" id="PostDetail-largesize">
                                        {data.originalPostedBy==undefined
                                         ?
                                            <Link to={`/profile/${data.postedBy.username}`} style={{ textDecoration: 'none',color:'#374151'}}>
                                                    {data.postedBy.Name}
                                            </Link>
                                            
                                         :
                                            <Link to={`/profile/${data.originalPostedBy.username}`} style={{ textDecoration: 'none',color:'#374151'}}>
                                                    {data.originalPostedBy.Name}
                                            </Link>
                                            
                                            // <h2>Orgp</h2>
                                        }
                                    </div>
                                    
                                    <VerifiedUserIcon className="PostDetail_verified"/>
                                    
                                    <div className="PostDetail_username" id="PostDetail-largesize">
                                        @{data.originalPostedBy==undefined
                                         ?
                                            <Link to={`/profile/${data.postedBy.username}`} style={{ textDecoration: 'none',color:'#374151'}}>
                                                    {data.postedBy.username}
                                            </Link>
                                            
                                         :
                                            <Link to={`/profile/${data.originalPostedBy.username}`} style={{ textDecoration: 'none',color:'#374151'}}>
                                                    {data.originalPostedBy.username}
                                            </Link>
                                            
                                        }
                                        
                                    </div>

                                    <div className='PostDetail_dot'>.</div>
                                    <div className='PostDetail_date' id="PostDetail-largesize">{timeDifference(new Date(),new Date(data.createdAt))}</div>
                                
                                </div>
                        
                        
                                <div className="PostDetail_text_img">
                                    {/* {console.log("RETWEET",data.retweetContent,typeof(data.retweetContent)!='undefined')} */}
                                    {typeof(data.content)!='undefined'
                                    ? 
                                        <p className="PostDetail_postText" id="PostDetail-postText-largesize">{data.content}</p>
                                        
                                    :   
                                    <div>
                                            {
                                                typeof(data.retweetContent)!='undefined'
                                                ?
                                                    <p className="PostDetail_postText" id="PostDetail-postText-largesize">{data.retweetContent}</p>
                                                :
                                                <p className="PostDetail_postText" id="PostDetail-postText-largesize">{data.retweetDataId.retweetContent}</p>
                                            }
                                        </div>
                                    }
                                    
                                </div>

                            {/* BOTTOM ICONS */}
                            <div className="PostDetail_bottomIcons">

                                    {/* <button id="myBtn" className='PostDetail_icon_button' onClick={()=>reply_clicked()}> 
                                        <ChatBubbleOutlineIcon fontSize="small" className='icon-comment'/>
                                    </button> */}
                                    <button id="myBtn" className='PostDetail_icon_button' onClick={() => reply_clicked()}>

                                        <div className='icon-div-like-number'>
                                            <ChatBubbleOutlineIcon fontSize="small" className='icon-comment' />

                                            {userInfo != undefined && typeof (userInfo.id) != 'undefined'
                                                ?
                                                <span className='icon-comment-number'>{data.totalReplies}</span>
                                                :
                                                <span className='icon-number'>{data.totalReplies}</span>
                                            }
                                        </div>

                                     </button>

                                        {/* -------------------2ND MODAL ------------------------------------------------------------------ */}
                                    {/*When Modal Open  */}
                                        {typeof(userInfo.id)!='undefined'
                                        ?
                                            <>
                                                {cnt==1?

                                                        <div id="myModal" className="modal3" onClick={() => divfun1()}>
                                                            <div className="modal-content" onClick={() => divfun2()}>
                                                                
                                                                    <div className='reply-closeArrowBtn'>
                                                                        <div className='modal-reply-heading'>Reply</div>
                                                                        <button className="closeArrowBtn" onClick={()=>reply_close_clicked()}>X</button>
                                                                    </div>

                                                                    <div className='modal-closeArrow-textarea'>
                                                                        
                                                                             <div className='PostDetail_header_modal'>
                                                                                    {/* <Avatar className="PostDetail_avator" src="https://media-exp2.licdn.com/dms/image/C4D03AQGPawx5zAoFWg/profile-displayphoto-shrink_800_800/0/1600092593879?e=1659571200&v=beta&t=0ffRoHZIbjbW2K79t0l9JnAkEnWgp2vda1MXHWhUwYs"/> */}
                                                                                    
                                                                                    {data.originalPostedBy == undefined
                                                                                        ?
                                                                                        <Avatar className="PostDetail_avator" src={`${data.postedBy.profilePicUrl}`} />
                                                                                        :
                                                                                        <Avatar className="PostDetail_avator" src={`${data.originalPostedBy.profilePicUrl}`} />
                                                                                        // <h2>Orgp</h2>
                                                                                    }
                                                                                
                                                                                    <div className="PostDetail_displayName">
                                                                                        {
                                                                                            data.originalPostedBy==undefined
                                                                                            ?
                                                                                                    data.postedBy.Name
                                                                                            :
                                                                                                    data.originalPostedBy.Name
                                                                                        }
                                                                                    </div>
                                                                                
                                                                                    <VerifiedUserIcon className="PostDetail_verified"/>
                                                                                            
                                                                                    <div className="PostDetail_username">
                                                                                        @{data.originalPostedBy==undefined
                                                                                            ?
                                                                                                data.postedBy.username
                                                                                            :
                                                                                                data.originalPostedBy.username
                                                                                            }
                                                                                    </div>
                                                                                    <div className='PostDetail_dot'>.</div>
                                                                                    <div className='PostDetail_date'>{timeDifference(new Date(),new Date(data.createdAt))}</div>
                                                                             </ div>
 
                                                                               {/* <p className="modal_postText">{data.content} 112</p> */}
                                                                               
                                                                               
                                                                                <div >                                                                                                
                                                                                    {typeof (data.content) != 'undefined'
                                                                                        ?
                                                                                            <p className="modal_postText"> {data.content}</p>

                                                                                        :
                                                                                            <div>
                                                                                                {
                                                                                                    typeof (data.retweetContent) != 'undefined'
                                                                                                        ?
                                                                                                        <p className="modal_postText">{data.retweetContent}</p>
                                                                                                        :
                                                                                                        <p className="modal_postText"> {data.retweetDataId.retweetContent}</p>
                                                                                                }
                                                                                            </div>
                                                                                     }

                                                                                </div>

                                                                               <div className="bottom-border"></div>
                                                                    
                                                                                <div className='modal-reply_header'>
                                                                                    <Avatar className="modal_PostDetail_avator" src={`${userInfo.profilePicUrl}`}/>
                                                                                    <textarea className='modal-textarea' id="myTextarea" placeholder='Tweet Your Reply' value={replycontent} onChange={(e)=>setreplycontent(e.target.value)} ></textarea>
                                                                                </div>
                                                                    </div>
                                                                
                                                                
                                                            
                                                                    {replycontent.trim().length!=0? 
                                                                        <button id="postBtn" className='modal_PostDetail_reply' onClick={()=>reply_submit_clicked(id)}>Post</button>
                                                                        :
                                                                        <button id="postBtn" className='modal_PostDetail_reply_disable' >Post</button>
                                                                    }

                                                                    <button id="closeBtn" className='modal_Close_reply' onClick={()=>reply_close_clicked()}>Close</button>
                                                                
                                                            </div> 
                                                        </div>
                                                :
                                                  null
                                                }
                                            </>
                                        :    
                                        null}

                                     {/* *********** 2ND MODAL CLOSE ********************************************************************************** */}



                                    {/* 2nd Retweet  */}
                                    <button className='PostDetail_icon_button' onClick={()=>retweet_clicked(id)}>

                                            <div className='icon-div-like-number'> 

                                                {reteweetColor==1
                                                ?
                                                    <RepeatIcon fontSize="small" className={'icon-retweet-green'}/>
                                                :
                                                    <RepeatIcon fontSize="small" className={'icon-retweet'}/>
                                                }

                                                {reteweetColor==1
                                                ?
                                                    <span className='icon-retweet-number'>{dataLen_RetweetId || ""}</span>
                                                :
                                                    <span className='icon-number'>{dataLen_RetweetId || ""}</span>
                                                }


                                            </div>
                                        
                                    </button>

                                    {/* 2nd Likes Part  */}
                                    <button id='like_button' className='PostDetail_icon_button' onClick={()=>like_clicked(id)}>
                                        

                                        <div className='icon-div-like-number'> 
                                            {/* <h1>Hi2</h1> */}
                                            {x==1?
                                                <div>
                                                        <FavoriteIcon fontSize="small" className={'icon-like-red'}/>
                                                </div>
                                                :
                                                <div>
                                                        <FavoriteBorderIcon fontSize="small" className={'icon-like'}/>
                                                </div>
                                            }
                                        
                                            {x==1?
                                                <span className='icon-like-number'>{dataLen_Likes || ""}</span>
                                                :
                                                <span className='icon-number'>{dataLen_Likes || ""}</span>
                                            }


                                        </div>

                                    </button> 

                            </div>             
                                {/* ⬆️Upper div is  Bottom Icons closing */}
                    
                        </div>
                         {/* ⬆️Upper div is  2nd Part closing */}
                 {/* </Link> */}
        
            </ div>
        
         :  null}
        

            {
              <div>
                {
                    //console.log(" 4.RES.DATA ",repliesData.length)
                        repliesData.length>0 && rootData.postedBy!=undefined?
                            // <div>
                            repliesData.map(i=>{
                                    // if(typeof(i[0].replyDataId)!='undefined')
                                    //   console.log("i=",repliesData.length,i[0],i)rootData
                                    // console.log("i=",data.postedBy)
                        
                                return  <Post4 
                                            key={i._id}
                                            id={i._id}
                                            Icon={Avatar}  
                                            displayName={i.postedBy.Name}
                                            username={i.postedBy.username}
                                            originalData={i.originalPostedBy}
                                            postText={i.content}
                                            editedText={i.content_BeforeEdit}
                                            createdAt={i.createdAt}
                                            // imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                                            verified="True"
                                            parentHandler={() => parentFuncPd()}
                                            //  parentHandler={()=>parentFuncPd()}   

                                            //  replyHandler={()=>replyFunc(i.content)}
                                            // replyHandler={()=>replyFunc()}
                                            // onClick={increment} 
                                            // count={count} 

                                            likeslength={i.likes.length}
                                            likesData={i.likes}
                                            retweetUserList={i.retweetUserList}
                                            retweetData={i.retweetDataId}
                                            //  retweetContent={i.retweetContent}
                                            // replyDataId={i.replyDataId}
                                            
                                            postDetails_boolean={true}
                                            postDetails_RootUser={rootData.postedBy.Name}
                                            postDetails_CurrentUser={data.postedBy.Name}
                                            totalReplies={i.totalReplies}
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