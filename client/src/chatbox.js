import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
//import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "./chat/ChatContainer.jsx";
import Contacts from "./chat/Contacts";
import Welcome from "./chat/Welcome";
import jwtDecode from "jwt-decode";
import Sidebar from "./Sidebar.js";
import Widgets from "./Widgets.js";
export default function Chatbox() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const data =async()=>{
      console.log(jwtDecode(localStorage.getItem('twittertoken')))
    if (!localStorage.getItem('twittertoken')) {
      navigate("/");
    } else {
      setCurrentUser(
        await jwtDecode(localStorage.getItem('twittertoken'))
      );
   
   
    }
  }
data();
  },[]);
  useEffect(() => {
    if (currentUser) {
      socket.current = io('http://localhost:5000');
      socket.current.emit("add-user", currentUser.id);
    }
  }, [currentUser]); 

  useEffect(() => {
    if (currentUser) {
     
      axios.get(`http://localhost:5001/auth/allusers/${currentUser.id}`).then(res =>{
         setContacts(res.data)
     }); 
 }
  }, [currentUser]);
 
 
  const handleChatChange = (chat) => {
    setCurrentChat(chat);

  };
 
  return (
    <div className="app">
      <Sidebar />
      <Container>
        <div className="container">
          <Contacts contacts={contacts}  changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
      <Widgets />
    </div>
  );
}

const Container = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex:0.3;

  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: white;
  .container {
    height: 100%;
    width: 50vw;
    background-color: #dae1eb;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
