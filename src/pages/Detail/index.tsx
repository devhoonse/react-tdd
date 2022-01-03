import React, {useEffect} from 'react';
import {useParams, useLocation, useNavigate} from "react-router-dom";
import styled from "styled-components";

import {Button} from "../../components";


const Container = styled.div`
 display: flex;
 background-color: #FFFFFF;
 padding: 20px;
 border-radius: 8px;
 box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
 align-items: center;
 flex-direction: column;
`;
const ToDo = styled.div`
 min-width: 350px;
 height: 350px;
 overflow-y: auto;
 border: 1px solid #BDBDBD;
 margin-bottom: 20px;
 padding: 10px;
`;

export const Detail = () => {
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();
  const toDoList = JSON.parse(localStorage.getItem('ToDoList') || '[]');
  const toDo = toDoList[parseInt(id || '')];
  const onDelete = () => {
    let list = [...toDoList];
    list.splice(Number.parseInt(id || ''), 1);
    localStorage.setItem('ToDoList', JSON.stringify(list));
    navigate('/');
  };

  useEffect(() => {
    if (toDo === undefined) {
      navigate('/404');
    }
  }, [toDo, navigate]);

  return (
    <Container>
      <ToDo>{toDo}</ToDo>
      <Button label={"삭제"}
              backgroundColor={"#FF1744"}
              hoverColor={"#F01440"}
              onClick={onDelete}
      />
    </Container>
  );
};
