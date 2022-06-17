import React from 'react'
import './Widgets.css'
import {
    TwitterTimelineEmbed,
    TwitterShareButton,
    TwitterTweetEmbed
} from 'react-twitter-embed'
import SearchIcon from '@material-ui/icons/Search'

function Widgets() {
    return (
        <div className = "widgets">
            <div className = "widgets__input">
                <SearchIcon 
                    className = "widgets__SearchIcon" 
                />
                <input placeholder = "Search Twitter" type = "text" />
            </div>
            <div className = "widgets__widgetContainer">
                <h2>
                    Whats'happening
                </h2>
       
               #Trending
              <ol>
               <li style={{marginTop:"20px",marginLeft:"30px"}}><strong> Dhvani</strong></li>
               <li style={{marginTop:"15px",marginLeft:"30px"}}><strong> Dhvani AI</strong></li>
               <li style={{marginTop:"15px",marginLeft:"30px"}}><strong> Full Stack Development</strong></li>
               <li style={{marginTop:"15px",marginLeft:"30px"}}><strong> Dhvani DL</strong></li>
               </ol>
            </div>
        </div>
    )
}

export default Widgets
