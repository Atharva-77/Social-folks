import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import './Tweetbox.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Tweetbox(props) {

    const [content, setcontent] = useState('')
    const [content2, setcontent2] = useState('')

    const userLoginData = useSelector(state => state.userLoginKey)
    const {userInfo} =userLoginData //....undefined

    // console.log("TweetBox",userLoginData,typeof(userLoginData)=='undefined');
    // console.log("TweetBox",content,typeof(undefined)=='undefined');
    
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

        axios.post(`http://localhost:4000/post/add`,content_data,config)
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

    return (
        <div className="Tweetbox">
            {/* <form> */}
            <div className="Tweetbox_avatar_input">
                
                <Avatar className="Tweetbox_avatar" src="https://d3g1bypfq0q5lj.cloudfront.net/var/www/preoffer/public/system/avatars/datas/304531/thumb250/IMG-20190416-WA0038.jpg?1587480679"/>

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
