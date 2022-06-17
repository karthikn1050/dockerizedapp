import { Avatar } from '@material-ui/core'
import  PublishIcon  from '@material-ui/icons/Publish'
import  ChatBubbleOutlineIcon  from '@material-ui/icons/ChatBubbleOutline'
import  VerifiedUserIcon  from '@material-ui/icons/VerifiedUser'
import RepeatIcon from '@material-ui/icons/Repeat'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import React, {forwardRef} from 'react'
import { Delete } from '@material-ui/icons'
import ReactPlayer from 'react-player'
import './Post.css'

const  Post = forwardRef(
    ({
        displayName,
        username,
        verified, 
        text, 
        image, 
        avatar,
        video
}, ref) => {
    return (
        <div className = "post" ref={ref}>
            <div className = "post__avatar">
                <Avatar 
                    src = {avatar}
                />
            </div>
            <div className = "post__body">
                <div className = "post__header">
                    <div className = "post__headerText">
                    <h3>
                        {displayName}
                            <span className = "post__headerSpecial">
                                {verified && <VerifiedUserIcon className = "post__badge" />}
                                @{username}
                            </span>
                    </h3>
                    </div>
                    <div className = "post__headerDescription">
                        <p>{text}</p>
                    </div>
                </div>
                <img 
                    src = {image}
                    alt = ""
                />
                <ReactPlayer url={video} />
                <div className = "post__footer">
                  {/*   <ChatBubbleOutlineIcon fontSize = "small" /> 
                    <RepeatIcon fontSize = "small" /> */}
                    <FavoriteBorderIcon fontSize = "small" />
                     <Delete  fontSize = "small" />  
                </div>
            </div>    
        </div>
    )
})

export default Post
