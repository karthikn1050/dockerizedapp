import React from 'react'
import { useState } from 'react'
import "./Sidebar.css"
import TwitterIcon from '@material-ui/icons/Twitter'
import SidebarOption from './SidebarOption'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import MailOutlineIcon from '@material-ui/icons/MailOutlineOutlined'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import ListAltIcon from '@material-ui/icons/ListAlt'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { Button } from '@material-ui/core'
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from './login'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import './Sidebar.css'
import Home from '@material-ui/icons/Home'
import { useNavigate } from 'react-router-dom'
import './SidebarOption.css'
const user = localStorage.getItem('twittertoken')


function Sidebar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate()
    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }
    const setModalIsOpenToFalse =()=>{
      setModalIsOpen(false)
  } 
  const logout =()=>{
      localStorage.removeItem('twittertoken')
      navigate('/')
  }
    return (
        <div className = "sidebar">
          {/*  <TwitterIcon
              className = "sidebar__twitterIcon"                
           />  */}
            <h3>iDiscover</h3>
         
           <div className = 'sidebarOption' style={{marginTop:"20px"}}> 
            
            <a style={{textDecoration:"none"}} href='/idiscover'> <h2> <HomeIcon style={{fontSize:"30px",margin:"1px 1px",marginTop:"7px",marginBottom:"12px"}} />Home</h2>
          </a>
        </div>
            <div className = 'sidebarOption'> 
            
            <a style={{textDecoration:"none"}} href='/idiscover/explore'> <h2> <SearchIcon style={{fontSize:"30px",margin:"1px 1px",marginTop:"7px",marginBottom:"12px"}} />Explore</h2>
          </a>
        </div>
        {user &&
        <div>
        <div className = 'sidebarOption'> 
            
            <a style={{textDecoration:"none"}} href='/idiscover/message'> <h2> <MailOutlineIcon style={{fontSize:"30px",margin:"1px 1px",marginTop:"7px",marginBottom:"12px"}} />Message</h2>
          </a>
        </div>
        <div className = 'sidebarOption'> 
            
            <a style={{textDecoration:"none"}} href='/idiscover/profile'> <h2> <PermIdentityIcon style={{fontSize:"30px",margin:"1px 1px",marginBottom:"12px",marginTop:"7px"}} />Profile</h2>
          </a>
        </div>
        </div>
}
        
          {/* {user &&
          <div>
           <SidebarOption 
              Icon = {MailOutlineIcon}
              text = "Message" 
              path='/message' 
           />
          
          
           <SidebarOption 
              Icon = {PermIdentityIcon}
              text = "Profile" 
               path ='/profile'
           />
           </div>
          } */}
        { !user  && <Button variant = "outlined" onClick={setModalIsOpenToTrue} className = "sidebar__tweet">Login</Button>  }
        {user &&  <Button variant = "outlined"  onClick={logout} className = "sidebar__tweets">Logout</Button>}
        <Modal show={modalIsOpen} onHide={modalIsOpen}>
    
      <Modal.Body>
         <Login />
      </Modal.Body>
     
      <Button onClick={setModalIsOpenToFalse}>Close</Button>
    </Modal>
        </div>
    )
}

export default Sidebar
