import React from 'react';
import {Routes, Route} from "react-router-dom";
import styled from "styled-components";

import './App.css';
import {PageHeader} from "./components";
import {List, Add, Detail, NotFound} from "./pages";


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
      <Routes>
        <Route path={"/"} element={<List />} />
        <Route path={"/add"} element={<Add />} />
        <Route path={"/detail/:id"} element={<Detail />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
