import { Avatar } from '@material-ui/core'
import React from 'react'
import './Tweetbox.css';

function Tweetbox() {
    return (
        <div className="Tweetbox">
            <div className="Tweetbox_avatar_input">
                <Avatar className="Tweetbox_avatar" src="https://d3g1bypfq0q5lj.cloudfront.net/var/www/preoffer/public/system/avatars/datas/304531/thumb250/IMG-20190416-WA0038.jpg?1587480679"/>
                <input className="Tweetbox_input" placeholder="Write a Post?" type ="text"/> 
            </div>

            <button className="Tweetbox_button">Post</button>
        </div>
    )
}

export default Tweetbox
