import { Avatar } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import './Tweetbox.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { LINKURL } from './Reducers/constants/userConstants';

function Tweetbox(props) {

    const [content, setcontent] = useState('')
    const [content2, setcontent2] = useState('')
   
    

    const userLoginData = useSelector(state => state.userLoginKey)
    const {userInfo} =userLoginData //....undefined
    
    const [picurl, setpicurl] = useState(userInfo.profilePicUrl)
    // console.log("TweetBox",userInfo,userInfo!=undefined && userInfo.id!=undefined);
    // console.log("TweetBox",content,typeof(undefined)=='undefined');
    useEffect(() => 
    {
        if(userInfo!=undefined && userInfo.id!=undefined)
        {
            // console.log("USEEFF",userInfo,userInfo!=undefined && userInfo.id!=undefined);
            const user_data=
            {
                "username":userInfo.username
            }
    
            axios.post(`${LINKURL}/profile/${userInfo.username}`,user_data)
            .then( res =>
                    {
                        // console.log("......................AXIOS:-",res.data); 
                        setpicurl(res.data.profilePicUrl)
                        // console.log("PROPS.parentHandler",props.parentHandler); 
                        // props.parentHandler();
                    }
                )
        }
        

    
     }, [])
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        //   console.log('do validate',content,content.length)
         
          //content data dosen't get trimmed
        //   var x=content.trim()
        //   setcontent2(x);
        //   setcontent(x);
          //content2 isn;t updated. so is content. but x is updated
        //   console.log('Con trim?',content,content.length,x,x.length,content2,content2.length)
         
          submit_form()
        }
      }

    const submit_form=()=>
    {
        setcontent(content.trim());
        var x=content.trim()
        // console.log("POST:-",content,content.length,x,x.length)
        
        // console.log("TRIM:-",content.trim(),content.trim().length)
        setcontent('')
        // console.log("POST35:-",content,content.length)
        
        const config=
        {
            headers:
            {
                'Content-Type':"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
       
        // console.log(config);
        const content_data=
        {
            "content":content.trim()
        }

        axios.post(`${LINKURL}/post/add`,content_data,config)
        .then( res =>
                {
                    console.log("AXIOS:-",res.data); 
                    console.log("PROPS.parentHandler",props.parentHandler); 
                    props.parentHandler();
                }
            )

        // console.log("PROPS.abc",props.greeted);
        // props.greeted();
    }
   
    //  {console.log("POST38:-",content,content.length)}
    
    // {console.log("URLLLLLLLL-",picurl)}

    return (
        <div className="Tweetbox">
            {/* <form> */}
            <div className="Tweetbox_avatar_input">
                
                <Avatar className="Tweetbox_avatar"  src={`${picurl}`}/>

                <textarea className="Tweetbox_input" placeholder="Write a Post?" type ="text" value={content} name="YO" onChange={(e)=>setcontent(e.target.value)} onKeyDown={handleKeyDown}/> 
            </div>

            {/* <input className="Tweetbox_img_input" placeholder="Optional: Enter image url"/> */}

            <div className='button_div'>
                {typeof(content)!='undefined' && content.trim().length>0   
                ?
                    <button className="Tweetbox_button" type="submit" onClick={submit_form}>Post</button>   
                 :  <button disabled className="Tweetbox_button" type="submit" onClick={submit_form} >Post</button>}

                 {/* <button onClick={props.greeted}>Hi</button> */}
            </div>
            
            {/* </form> */}
        
        </div>
    )
}

export default Tweetbox
