import { Avatar } from '@material-ui/core';
import React, { useState,useEffect } from 'react'
import './HomePage.css';
import Post from './Post';
import Post2 from './Post2';
import Post3 from './Post3';


import Tweetbox from './Tweetbox';
import axios from 'axios';

function HomePage() {
   
    const [data, setdata] = useState('')
    const [reload,setreload]=useState(0)
    useEffect(() => 
    {
        axios.get(`http://localhost:4000/post/allpost`)
        .then(res=>
            {
                console.log("HomePg RES.DATA ",(res.data),(res.data[2].content), res.data[2].retweetUserList);
                setdata(res.data);
                setreload(0)
                
                
            })

    }, [reload])

        { 
            var result = Object.keys(data).map((key) => [data[key]]);
            // console.log("RESULT",result,typeof(result),"\nDATA",data);
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


    return (
        <div className="HomePage">
            <div className="HomePage_title">
                <h2>Home</h2><h2>{count}</h2>
            </div>

            <Tweetbox parentHandler={()=>parentFunc()}/>
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
                 {
                    result.map((i)=>(
                        <Post3 
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
                        />
                        // console.log("i=",i[0].likes.length,i[0])
                        ))
                 }


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
