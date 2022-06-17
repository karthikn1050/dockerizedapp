
import React, { useState } from "react";
import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {Button} from "@material-ui/core"
import Home from "@material-ui/icons/Home";
import Modal from "react-bootstrap/Modal";
import Login from '../login'
const user = localStorage.getItem('twittertoken')


function Sidebar() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }
    const setModalIsOpenToFalse =()=>{
      setModalIsOpen(false)
  } 
  const logout =()=>{
      localStorage.removeItem('twittertoken')
      window.location.reload();
  }
    return (
        <div className="sidebar">
            <Home />
            <TwitterIcon className="sidebar__twitterIcon" />

            <SidebarOption active Icon={Home} path='/'  text="Home" />
            <SidebarOption Icon={SearchIcon} path='/explore' text="Explore" />
            <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
            <SidebarOption Icon={MailOutlineIcon} path='message' text="Messages" />
            <SidebarOption Icon={PermIdentityIcon} path='profile' text="Profile" />
  

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
