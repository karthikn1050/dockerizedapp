import axios from 'axios'
import React, { Component } from 'react'
import Loader from './loader'
import VerifiedUser from '@material-ui/icons/VerifiedUser'
import FlipMove from 'react-flip-move'
import { Avatar } from '@material-ui/core'
import './Post.css'
import './profile.css'
import jwtDecode from 'jwt-decode'
import { ICON_ARROWBACK, ICON_MARKDOWN, ICON_DATE, ICON_CLOSE, ICON_UPLOAD, ICON_NEWMSG } from './Icons'
import Widgets from './Widgets'
import Sidebar from './Sidebar'
export default class Profile extends Component {
    constructor(){
        super()
        this.state ={
            tweet:[]
        }
    }
    
    componentDidMount(){
       let user= localStorage.getItem('twittertoken')
        let decode= jwtDecode(user).username
        //console.log(decode)
        axios.post('http://localhost:5000/getuser',{
            username:decode
        }).then(res => this.setState({tweet: res.data})) 
    }
  render() {
    let users= localStorage.getItem('twittertoken')
      const user = jwtDecode(users).username
      
    return (
        <div className='app'>
            <div className=''>
            <Sidebar />
            </div>
            <div>
            <div className="profile-wrapper">
            <div className="profile-header-wrapper">
                
                <div className="profile-header-content">
                    <div className="profile-header-name">
                            { user}
                    </div>
                </div>
            </div>
            <div className="profile-banner-wrapper">
                <img src='https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300' alt=""/>
            </div>
            <div className="profile-details-wrapper">
                <div className="profile-options">
                    <div className="profile-image-wrapper">
                        <img src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png" alt=""/>
                    </div>
                   
                  
                       
                    
                </div>
                <div className="profile-details-box">
                    <div className="profile-name">{user}</div>
                    <div className="profile-username">@{user}</div>
                    <div className="profile-info-box">
              
                        <ICON_DATE/>
                        <div className="profile-date"> Joined Today </div>
                    </div>
                </div>
                
            </div>
            <div className="profile-nav-menu">
                <div key={'tweets'}  className={`profile-nav-item activeTab`  }>
                    Tweets
                </div>
            </div>
            <FlipMove>
                {this.state.tweet.map(post => (
                       <div className = "post" >
          
         
       <div className = "post__avatar">
                <Avatar 
                    src = "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_1280.png"
                />
            </div>
            <div className = "post__body">
                <div className = "post__header">
                    <div className = "post__headerText">
                    <h3>
                    {post.displayName}
                            <span className = "post__headerSpecial">
                                {true && <VerifiedUser className = "post__badge" />}
                                @{post.username}
                            </span>
                    </h3>
                    </div>
                    <div className = "post__headerDescription">
                        <p>{post.text}</p>
                    </div>
                </div>
                <img 
                    src = {post.image}
                    alt = ""
                />
                <div className = "post__footer">
                
                   
                </div>
            </div>  
        </div>
            ))}
            </FlipMove>  
            </div>
            
            </div>
     <Widgets />
    </div>
    )
  }
}
