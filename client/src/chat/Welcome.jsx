import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Welcome() {

  return (
    <Container>

      
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`

  color: black;

  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
