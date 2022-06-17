import React, { useEffect, useState } from 'react'
import './Feed.css'
import TweetBox from './TweetBox'
import FlipMove from 'react-flip-move'
import axios from 'axios'
import { Avatar } from '@material-ui/core'
import  VerifiedUserIcon  from '@material-ui/icons/VerifiedUser'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import './Post.css'
import { ObjectID } from 'bson';
import { Delete } from '@material-ui/icons'
import Login from './login'
import SidebarOption from './SidebarOption'
import Sidebar from './Sidebar'
import Home from '@material-ui/icons/Home'
import Widgets from './Widgets'
import ReactPlayer from 'react-player'
const user = localStorage.getItem('twittertoken')
function Feed() {
    const [posts, setPosts] = useState([]);
    const[count,setCount] = useState(0)
    useEffect(() => {
       // setInterval(()=>{
            axios.get('http://localhost:5000/get').then(res =>
            
            setPosts(res.data))

       // },5000)
        
    
    }, [])
   const onLike = (id,e) =>{
   let data= new ObjectID(id).toHexString()
   console.log("asd",id.trim())
       setCount(count+1)
    axios.put(`http://localhost:5000/update/${data}`,{
        like:count
    })
    }
    onclick = (id,e) =>{
        let data= new ObjectID(id).toHexString()
        console.log(data)
        axios.delete(`http://localhost:5000/delete/${data}`).then(res => console.log(res))
    }
    //console.log(posts)
        let arr = [...posts].reverse();
    return (
        <div className='app'>
            <Sidebar />
        <div className = "feed">
            <div className = "feed__header">
                <h2>Home</h2>
            </div>
            {user && 
            <TweetBox />
                }
                {!user &&
                <Login />}
            <FlipMove>
            
                {arr.map(post => (
                       <div className = "post" >
             {/*    <Post 
                key = {post.text}
                displayName = {post.displayName}
                username = {post.username}
                verified = "true"
                text = {post.text}
                image = {post.image}
                avatar = "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_1280.png"
            /> */}
         
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
                                {true && <VerifiedUserIcon className = "post__badge" />}
                                @{post.username}
                            </span>
                    </h3>
                    </div>
                    <div className = "post__headerDescription">
                        <p>{post.text}</p>
                    </div>
                </div>
                <img 
                 onError={e => e.target.style.display = 'none'}
                    src = {post.image}
                    alt = ""
                    style={{width:"300px",height:"200px"}}
                />
                {post.video && 
                <ReactPlayer controls url={post.video} height='300px' width='500px' />
                }
                <div className = "post__footer">
                
                    <button className='button' onClick={(e) => onLike(post._id,e)}><FavoriteBorderIcon fontSize = "small" />{post.like}</button>
                     <button className='button' onClick={(e) => onclick(post._id,e)}><Delete  fontSize = "small"  /></button>  
                </div>
            </div>  
        </div>
            ))}
            </FlipMove>   
         
        </div>
        <Widgets />
        </div>
    )
}
export default Feed;
