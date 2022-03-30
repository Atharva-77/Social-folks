import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import './Tweetbox.css';

function Tweetbox() {

    const [a, seta] = useState()
    console.log("TweetBox",a);
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          console.log('do validate',a)
        }
      }

    const submit_form=()=>
    {
        console.log("POST:-",a)
    }
    return (
        <div className="Tweetbox">
            {/* <form> */}
            <div className="Tweetbox_avatar_input">
                <Avatar className="Tweetbox_avatar" src="https://d3g1bypfq0q5lj.cloudfront.net/var/www/preoffer/public/system/avatars/datas/304531/thumb250/IMG-20190416-WA0038.jpg?1587480679"/>
                <textarea className="Tweetbox_input" placeholder="Write a Post?" type ="text" name="YO" onChange={(e)=>seta(e.target.value)} onKeyDown={handleKeyDown}/> 
            </div>
            <input className="Tweetbox_img_input" placeholder="Optional: Enter image url"/>
            <button className="Tweetbox_button" type="submit" onClick={submit_form}>Post</button>
        {/* </form> */}
        
        </div>
    )
}

export default Tweetbox
