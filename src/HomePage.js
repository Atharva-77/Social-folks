import { Avatar } from '@material-ui/core';
import React, { useState,useEffect } from 'react'
import './HomePage.css';
import Post from './Post';
import Post2 from './Post2';
import Post3 from './Post3';
import Post4 from './Post4';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';


import Tweetbox from './Tweetbox';
import axios from 'axios';

function HomePage() {

    const { id } = useParams();

    const [data, setdata] = useState('')
    const [specificFollowing_Data, setspecificFollowing_Data] = useState('')

    const [reload,setreload]=useState(1)

    const userLoginData = useSelector(state => state.userLoginKey)
    const { loading, userInfo, error } = userLoginData

    // console.log("USER LOGGED IN?", typeof (userInfo.name) != 'undefined');


    const [allPost_Tab, setallPost_Tab] = useState(1);

    useEffect(() => 
    {

        
        console.log("N UseEffect ", id);
        if(reload==1)
        {

            if (typeof (userInfo.name) != 'undefined') 
            {
                console.log("LOGGED IN UseEffect ", userInfo.username);
                
                const config =
                {
                    headers:
                    {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                const postData =
                {
                    "postid": id
                }

                axios.get(`http://localhost:4000/post/allpost/following/${userInfo.username}`,config)
                    .then(res => {
                        // console.log("HomePg RES.DATA ",(res.data));
                        setspecificFollowing_Data(res.data);
                    })
            }


            axios.get(`http://localhost:4000/post/allpost`)
                .then(res => {

                    console.log("HomePg RES.DATA ", (res.data));
                    setdata(res.data);
                    setreload(0);

                })
            
        }

    }, [reload])

        { 
            var result = Object.keys(data).map((key) => [data[key]]);
            // console.log("RESULT",result,typeof(result),"\nDATA",data);
        }
        {
            var specificResult = Object.keys(specificFollowing_Data).map((key) => [specificFollowing_Data[key]]);
            console.log("SRESULT", typeof(specificResult), "\nDATA", specificFollowing_Data);
        }


        // {console.log("data", data[0].content,typeof(data),Object.keys(data).length,Object.keys(data));}
        // {  (typeof(data)!='undefined') 
        //     ?
        //          console.log("data",typeof(data),Object.keys(data).length,Object.keys(data))
        //          // console.log("data", data[0].content,typeof(data),Object.keys(data).length,Object.keys(data))

        //     :
        //          console.log("data ELSE")

        // }

        const parentFunc=()=>
        {
            console.log("clicked");
            setreload(1);
            // alert("Button clicked")
        }
        const replyFunc=(hi)=>
        {
            console.log(`clicked ${hi}`);
           
            // alert(`clicked ${hi}`)
        }

        const [count, setCount] = useState(0);
        const increment = () => 
        {
            setCount(count + 1)
        }


        // Posts Tabs
        const AllPostsTab_clicked_func = () => {
            console.log("1.1HI");
            setallPost_Tab(1);
        }

        const Specific_PostsTab_clicked_func = () => {
            console.log("2.2HI");
            setallPost_Tab(0);
        }


    return (
        <div className="Homepage">
            <div className="Homepage_title">
                <h2>Home</h2>
                {/* <h2>{count}</h2> */}
            </div>

            <Tweetbox parentHandler={()=>parentFunc()}/>
           

            <div className='Homepage_Allposts_specificPost_tab'>
             {
                    typeof (userInfo.name) != 'undefined'? //If logged in
                       <>
                            {allPost_Tab == 1 ?
                                <>
                                    <div className='Homepage_Post_tab_underline' onClick={() => AllPostsTab_clicked_func()}> All Posts </div>
                                    <div className='Homepage_Post_tab' onClick={() => Specific_PostsTab_clicked_func()}> Following Users Posts </div>

                                </>
                                :

                                <>
                                    <div className='Homepage_Post_tab' onClick={() => AllPostsTab_clicked_func()}> All Posts </div>
                                    <div className='Homepage_Post_tab_underline' onClick={() => Specific_PostsTab_clicked_func()}> Following Users Posts </div>
                                </>
                            }
                       </>

                     : // If not logged in

                        <div className='Homepage_Post_tab_underline' onClick={() => AllPostsTab_clicked_func()}> All Posts </div>
             }
            </div>

            <div className='1.Homepage_Allposts_specificPost_tab'>
                {
                    typeof (userInfo.name) != 'undefined' ? //If logged in
                        <>
                            {allPost_Tab == 1 ?
                                <>
                                    {
                                        result.map(i => {
                                            // if(typeof(i[0].replyDataId)!='undefined')
                                            

                                            return <Post4
                                                key={i[0]._id}
                                                id={i[0]._id}
                                                Icon={Avatar}
                                                displayName={i[0].postedBy.Name}
                                                username={i[0].postedBy.username}
                                                originalData={i[0].originalPostedBy}//ONLY THIS PART IS DIFFERENT....DURING RETWEET, DISPLAYNAME CHANGED....
                                                postText={i[0].content}
                                                editedText={i[0].content_BeforeEdit}

                                                createdAt={i[0].createdAt}
                                                // imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                                                verified="True"
                                                parentHandler={() => parentFunc()}

                                                //  replyHandler={()=>replyFunc(i[0].content)}
                                                replyHandler={() => replyFunc()}
                                                onClick={increment}
                                                count={count}

                                                likeslength={i[0].likes.length}
                                                likesData={i[0].likes}
                                                retweetUserList={i[0].retweetUserList}
                                                retweetData={i[0].retweetDataId}
                                                //  retweetContent={i[0].retweetContent}
                                                replyDataId={i[0].replyDataId}
                                                
                                            />

                                            // console.log("i=",i[0].likes.length,i[0])
                                        })
                                    }

                                </>
                             : 
                                //Logged in but Specific posts

                                <>
                                    {
                                        specificResult.map(i => {

                                            return <Post4
                                                key={i[0]._id}
                                                id={i[0]._id}
                                                Icon={Avatar}
                                                displayName={i[0].postedBy.Name}
                                                username={i[0].postedBy.username}
                                                originalData={i[0].originalPostedBy}//ONLY THIS PART IS DIFFERENT....DURING RETWEET, DISPLAYNAME CHANGED....
                                                postText={i[0].content}
                                                editedText={i[0].content_BeforeEdit}

                                                createdAt={i[0].createdAt}
                                                // imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                                                verified="True"
                                                parentHandler={() => parentFunc()}

                                                //  replyHandler={()=>replyFunc(i[0].content)}
                                                replyHandler={() => replyFunc()}
                                                onClick={increment}
                                                count={count}

                                                likeslength={i[0].likes.length}
                                                likesData={i[0].likes}
                                                retweetUserList={i[0].retweetUserList}
                                                retweetData={i[0].retweetDataId}
                                                //  retweetContent={i[0].retweetContent}
                                                replyDataId={i[0].replyDataId}
                                            />

                                            // console.log("i=",i[0].likes.length,i[0])
                                        })
                                    }
                                </>
                            }
                        </>

                        : // If NOT logged in

                        <>
                            {
                                result.map(i => {
                                    // if(typeof(i[0].replyDataId)!='undefined')


                                    return <Post4
                                        key={i[0]._id}
                                        id={i[0]._id}
                                        Icon={Avatar}
                                        displayName={i[0].postedBy.Name}
                                        username={i[0].postedBy.username}
                                        originalData={i[0].originalPostedBy}//ONLY THIS PART IS DIFFERENT....DURING RETWEET, DISPLAYNAME CHANGED....
                                        postText={i[0].content}
                                        editedText={i[0].content_BeforeEdit}
                                        createdAt={i[0].createdAt}
                                        // imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                                        verified="True"
                                        parentHandler={() => parentFunc()}

                                        //  replyHandler={()=>replyFunc(i[0].content)}
                                        replyHandler={() => replyFunc()}
                                        onClick={increment}
                                        count={count}

                                        likeslength={i[0].likes.length}
                                        likesData={i[0].likes}
                                        retweetUserList={i[0].retweetUserList}
                                        retweetData={i[0].retweetDataId}
                                        //  retweetContent={i[0].retweetContent}
                                        replyDataId={i[0].replyDataId}
                                    />

                                    // console.log("i=",i[0].likes.length,i[0])
                                })
                            }

                        </>
                }
            </div>
            {/* <Post 
                  Icon={Avatar}  
                  displayName="Atharva Shirode"
                  username="@atharva123"
                  postText="The early stage VC community is so tight, if founders exaggerate / over represent their company while fundraising it usually comes back to bite them quick.

                  syndicate leads on angel list though… seem to have a much looser feedback mechanism with fewer consequences"
                  imageUrl="https://media.giphy.com/media/FdRnTOHG0qP0eur2fA/giphy.gif"
                  verified="True"/> */}

        {/* {data!==''?
                    // data.map((i)=>
                    //     (
                    //         console.log("DATA_MAP ",i.content)
                    //     )
                    //     )
                        data.map((i)=>(
                            <Post 
                                key={i._id}
                                id={i._id}
                                Icon={Avatar}  
                                displayName={i.postedBy.Name}
                                username={i.postedBy.username}
                                postText={i.content}
                                createdAt={i.createdAt}
                                // imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                                 verified="True"
                                 parentHandler={()=>parentFunc()}
                                 likeslength={i.likes.length}
                            />
                            // console.log("i=",i[0].likes.length,i[0])
                            ))
                
                 :
                 console.log("ELSE-DATA-MAP")} */}

        {/* <div className="home__row"> */}
            {/* {(typeof(result)!='undefined')? */}

            {/* ---------------------------------------------------------------------------------------------------- */}
            {/* ---------------------------------------------------------------------------------------------------- */}

                {/* {
                    result.map(i=>{
                        // if(typeof(i[0].replyDataId)!='undefined')
                      
                        
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
                                    parentHandler={()=>parentFunc()}   

                                    //  replyHandler={()=>replyFunc(i[0].content)}
                                    replyHandler={()=>replyFunc()}
                                    onClick={increment} 
                                    count={count} 

                                    likeslength={i[0].likes.length}
                                    likesData={i[0].likes}
                                    retweetUserList={i[0].retweetUserList}
                                    retweetData={i[0].retweetDataId}
                                    //  retweetContent={i[0].retweetContent}
                                    replyDataId={i[0].replyDataId}
                                />
                      
                        // console.log("i=",i[0].likes.length,i[0])
                    })
                 } */}

                 {/* ---------------------------------------------------------------------------------------------------- */}
                {/* ---------------------------------------------------------------------------------------------------- */}


                    {/* return typeof(i[0].originalPostedBy)=='undefined'?
                        //  return 
                         <Post4 
                            key={i[0]._id}
                            id={i[0]._id}
                            Icon={Avatar}  
                            displayName={i[0].postedBy.Name}
                            username={i[0].postedBy.username}
                            postText={i[0].content}
                            createdAt={i[0].createdAt}
                            // imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                             verified="True"
                             parentHandler={()=>parentFunc()}   

                            //  replyHandler={()=>replyFunc(i[0].content)}
                            replyHandler={()=>replyFunc()}
                            onClick={increment} 
                            count={count} 

                             likeslength={i[0].likes.length}
                             likesData={i[0].likes}
                             retweetUserList={i[0].retweetUserList}
                             retweetData={i[0].retweetDataId}
                            //  retweetContent={i[0].retweetContent}
                            replyDataId={i[0].replyDataId}
                          />
                          :
                        
                        // null
                        // <h1>Hi</h1>
                    //     <div>
                        <Post4 
                        key={i[0]._id}
                        id={i[0]._id}
                        Icon={Avatar}  
                        displayName={i[0].originalPostedBy.Name}
                        username={i[0].originalPostedBy.username}

                        originalData={i[0].originalPostedBy}
                        // org={i[0].originalPostedBy.Name}

                        postText={i[0].content}
                        createdAt={i[0].createdAt}
                        // imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                         verified="True"
                         parentHandler={()=>parentFunc()}   

                        //  replyHandler={()=>replyFunc(i[0].content)}
                        replyHandler={()=>replyFunc()}
                        onClick={increment} 
                        count={count} 

                         likeslength={i[0].likes.length}
                         likesData={i[0].likes}
                         retweetUserList={i[0].retweetUserList}
                         retweetData={i[0].retweetDataId}
                        //  retweetContent={i[0].retweetContent}
                        replyDataId={i[0].replyDataId}
                      />
                    //   </div>
                    }) */}


                {/* {
                    result.map((i)=>(
                        <Post2
                            key={i[0]._id}
                            id={i[0]._id}
                            Icon={Avatar}  
                            displayName={i[0].postedBy.Name}
                            username={i[0].postedBy.username}
                            postText={i[0].content}
                            createdAt={i[0].createdAt}

                            verified="True"
                             parentHandler={()=>parentFunc()}   

                            replyHandler={()=>replyFunc()}
                            onClick={increment} 
                            count={count} 

                             likeslength={i[0].likes.length}
                             likesData={i[0].likes}
                             retweetUserList={i[0].retweetUserList}
                             retweetData={i[0].retweetDataId}
                        />
                        ))
                 } */}
            {/* // :
            // console.log("ELSE MAP")
            // } */}
                                    
             {/* </div> */}

            {/* <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div>
            <div>ABC</div> */}
            
        </div>
    )
}

export default HomePage
