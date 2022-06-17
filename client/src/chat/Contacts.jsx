import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import styled from "styled-components";


export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);

  const [currentSelected, setCurrentSelected] = useState(undefined);
 /*  useEffect(async () => {
    const data = await jwtDecode(localStorage.getItem('twittertoken'))
    
    setCurrentUserName(data.username);
 
  },[]);
 */
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    console.log(contact)
  };
  return (
    <>
      
        <Container>
          <div className="brand">
          <h3>All Users</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact.id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          
        </Container>
   
    </>
  );
}
const Container = styled.div`
  display: grid;
  border-right:5px solid white;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color:#dae1eb;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: black;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: black;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color:lightblue;
      min-height: 2rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color:black;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h3 {
        color: black;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h3 {
          font-size: 1rem;
        }
      }
    }
  }
`;
