import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router';
import axios from 'axios';
import { Avatar } from '@material-ui/core';
import './Follow.css'

import { userAction_details } from './Reducers/actions/userActions';
import FollowList from './FollowList';



function Follow() {



    const { id } = useParams();
    const { query } = useLocation();

    // console.log(id, "HI ", query);

    const [followers_Tab, setfollowers_Tab] = useState(query);
    const [data, setdata] = useState('')
    const [followersData, setfollowersData] = useState('');
    const [followingData, setfollowingData] = useState('');

    useEffect(() => {

        console.log("IDDD",id);
        axios.get(`http://localhost:4000/profile/allFollowers/${id}`)
            .then(res => {
                console.log("FOLLLOW data", res.data,typeof(res.data));
                // console.log("\n\nFollowers data", typeof(res.data.followers));
                // console.log("\n\n\n\nFollowing data", res.data.following);

                setdata(res.data)
                setfollowersData(res.data.followers);
                setfollowingData(res.data.following);
            })


        //Followers list
        //Following list
        // if(id==typeof(undefined))
        // {
        //     console.log("ID Undefined");
        //     setprofileData("NO SUCH USER")
        // }
        // else
        // {
        //     console.log("YES/NOT LOGGED IN");

        //     const userData=
        //     {
        //         "username":id
        //     }

        //     axios.post(`http://localhost:4000/profile/${id}`,userData)
        //     .then(res=>
        //         {
        //             console.log("Profile RES.DATA ",(res.data));         
        //             setprofileData(res.data);       

        //         })

        //     axios.get(`http://localhost:4000/post/postedBy/${id}`)
        //     .then(res=>
        //         {
        //             // console.log("Posts all  RES.DATA ",(res.data));         
        //             // setprofileData(res.data);   
        //             setdata(res.data);    

        //         })

        //     axios.get(`http://localhost:4000/post/postedBy/likes/${id}`)
        //     .then(res=>
        //         {
        //             // console.log("Likes  RES.DATA ",(res.data));         
        //             // setprofileData(res.data);   
        //             setlikesdata(res.data);    

        //         })
        // }


    }, [id])


    const FollowersTab_clicked_func = () => {
        // console.log("1.1HI");
        setfollowers_Tab(1);
    }

    const FollowingTab_clicked_func = () => {
        // console.log("2.2HI");
        setfollowers_Tab(0);
    }

    {
        if (data !="NO SUCH USER")
        {
            var followerResult = Object.keys(followersData).map((key) => [followersData[key]]);
            console.log("FOLLOWERS Array", followerResult);
        }
            

    }
    {
        if (data != "NO SUCH USER")
        {
            var followingResult = Object.keys(followingData).map((key) => [followingData[key]]);
            console.log("FOLing Array", followingResult.length, followingData==''  );
        }
        

    }
    return (

        <div className='Follow_top'>
            <h2>Username </h2>
            {/* {profileData.username} */}
            <div className='Follow_followers_following_tab'>

                {followers_Tab == 1 ?
                    <>
                        <div className='Follow_tab_underline' onClick={() => FollowersTab_clicked_func()}> Followers </div>
                        <div className='Follow_tab' onClick={() => FollowingTab_clicked_func()}> Following </div>

                    </>
                    :

                    <>
                        <div className='Follow_tab' onClick={() => FollowersTab_clicked_func()}> Followers </div>
                        <div className='Follow_tab_underline' onClick={() => FollowingTab_clicked_func()}> Following </div>
                    </>
                }

            </div>

               {Object.keys(data).length > 0 && data != "NO SUCH USER" ?
                    <>
                        {/* If Follower part clicked */}
                        {followers_Tab == 1 ?
                
                            <>
                                {
                                    followerResult != '' ?

                                        followerResult.map(i => {
                                            console.log("FRESULT ", followerResult);

                                            return <FollowList
                                                key={i[0]._id}
                                                id={i[0]._id}
                                                Icon={Avatar}
                                                displayName={i[0].Name}
                                                username={i[0].username}
                                            />

                                        })
                                        :

                                        <div className='Follow_NoFollows'>No Followers</div>
                                }
                            </> 

                         :
                            <>
                            {
                                followingResult!=''?
                                
                                    followingResult.map(i => {
                                        console.log("FRESULT ",followingResult);

                                        return <FollowList
                                            key={i[0]._id}
                                            id={i[0]._id}
                                            Icon={Avatar}
                                            displayName={i[0].Name}
                                            username={i[0].username}

                                        />



                                    })
                                 :
                                 
                                    <div className='Follow_NoFollows'>Not Following Anyone</div> 
                            }
                            </> /* ⬆️ Following tab closing bracket */
                        }
                    </> /* ⬆️ Followers tab closing bracket */
                    :
                    /* ⬆️ If No SUCH USER */
                    <>
                        {
                            data == "NO SUCH USER" ?
                                <div className='Follow_NoFollows'>No Such User</div>
                                :
                                <div className='Follow_NoFollows'>Invalid Details</div>
                        }

                    </>
                }



            

        </div>

    )
}

export default Follow
