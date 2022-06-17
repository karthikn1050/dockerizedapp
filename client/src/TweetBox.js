import { Avatar, Button } from '@material-ui/core'
import React, { useState } from 'react'
import './TweetBox.css'

import axios from 'axios'
import jwtDecode from 'jwt-decode'

const user = localStorage.getItem('twittertoken')

function TweetBox() {
    const [tweetMessage, setTweetMessage] = useState("");
    const [tweetImage, setTweetImage] = useState("");
    const [tweetVideo, setTweetVideo] = useState("");

    const sendTweet = e => {
        if(user){
            const decode = jwtDecode(user).username
            console.log("video",tweetVideo)
        e.preventDefault();
        axios.post('http://localhost:5000/postmessage', {
            displayName :decode,
            username: decode,
            //verified: true,
            text: tweetMessage,
            image: tweetImage,
            video:tweetVideo
            
        }).then(res => console.log(res.data)).catch(err => alert(err))
      
       
      
        setTweetVideo("")
        setTweetMessage("")
        setTweetImage("")
    }else{
        alert("Please Login to Post Tweets")
    }
    }

    return (
        <div className = "tweetBox">
            <form>
                <div className = "tweetBox__input">
                    <Avatar
                        src = "https://pbs.twimg.com/profile_images/1266938830608875520/f-eajIjB_400x400.jpg"
                    />
                    <input 
                        onChange = {(e) => setTweetMessage(e.target.value)}
                        value = {tweetMessage} 
                        placeholder = "What's happening" 
                        type = "text" 
                    />
                </div>
                <input 
                    onChange = { (e) => setTweetImage(e.target.value) }
                    value = {tweetImage}
                    className = "tweetBox__imageInput"
                    placeholder = "Enter Image URL"
                    type = "text"
                />
                 <input 
                    onChange = { (e) => setTweetVideo(e.target.value) }
                    value = {tweetVideo}
                    className = "tweetBox__imageInput"
                    placeholder = "Enter Video URL"
                    type = "text"
                />
                <Button 
                onClick = { sendTweet }
                className = "tweetBox__tweetButton">Tweet</Button>
            </form>
        </div>
    )
}

export default TweetBox
