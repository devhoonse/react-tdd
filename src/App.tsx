import React from 'react';
import styled from "styled-components";

import './App.css';
import {PageHeader, Button} from "./components";
import {List, Add} from "./pages";


const Container = styled.div`
 min-height: 100vh;
 background-color: #EEEEEE;
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
`;

function App() {
  return (
    <Container>
      <PageHeader />
      <Add />
    </Container>
  );
}

export default App;
