import { Avatar } from '@material-ui/core'
import React from 'react'
import './Tweetbox.css';

function Tweetbox() {
    return (
        <div className="Tweetbox">
            {/* <form> */}
            <div className="Tweetbox_avatar_input">
                <Avatar className="Tweetbox_avatar" src="https://d3g1bypfq0q5lj.cloudfront.net/var/www/preoffer/public/system/avatars/datas/304531/thumb250/IMG-20190416-WA0038.jpg?1587480679"/>
                <textarea className="Tweetbox_input" placeholder="Write a Post?" type ="text"/> 
            </div>
            <input className="Tweetbox_img_input" placeholder="Optional: Enter image url"/>
            <button className="Tweetbox_button">Post</button>
        {/* </form> */}
        
        </div>
    )
}

export default Tweetbox
