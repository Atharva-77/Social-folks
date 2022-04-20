import { Avatar } from '@material-ui/core';
import React, { useState,useEffect } from 'react'
import './HomePage.css';
import Post from './Post';
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
                // console.log("HomePg RES.DATA ",(res.data));
                setdata(res.data);
                setreload(0)
                
                
            })

    }, [reload])

        { 
            var result = Object.keys(data).map((key) => [data[key]]);
            console.log("RESULT",result,typeof(result));
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



    return (
        <div className="HomePage">
            <div className="HomePage_title">
                <h2>Home</h2>
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

{/* <Post 
                  Icon={Avatar}  
                  displayName="Atharva Shirode"
                  username="@atharva123"
                  postText="The early stage VC community is so tight, if founders exaggerate / over represent their company while fundraising it usually comes back to bite them quick.

                  syndicate leads on angel list though… seem to have a much looser feedback mechanism with fewer consequences"
                  imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                  verified="True"/>
<Post 
                  Icon={Avatar}  
                  displayName="Atharva Shirode"
                  username="@atharva123"
                  postText="The early stage VC community is so tight, if founders exaggerate / over represent their company while fundraising it usually comes back to bite them quick.

                  syndicate leads on angel list though… seem to have a much looser feedback mechanism with fewer consequences"
                  imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                  verified="True"/>
<Post 
                  Icon={Avatar}  
                  displayName="Atharva Shirode"
                  username="@atharva123"
                  postText="The early stage VC community is so tight, if founders exaggerate / over represent their company while fundraising it usually comes back to bite them quick.

                  syndicate leads on angel list though… seem to have a much looser feedback mechanism with fewer consequences"
                  imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                  verified="True"/> */}
        
        {/* <div className="home__row"> */}
            {/* {(typeof(result)!='undefined')?
                // {
                    result.map((i)=>(
                        <Post 
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
                             likeslength={i[0].likes.length}
                        />
                        // console.log("i=",i[0].likes.length,i[0])
                        ))
                // }
            :
            console.log("ELSE MAP")
            } */}
                                    
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
