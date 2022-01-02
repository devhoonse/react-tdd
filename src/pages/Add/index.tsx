import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

import {Button} from "../../components";


const Container = styled.div`
 display: flex;
`;
const Input = styled.input`
 font-size: 16px;
 padding: 10px 10px;
 border-radius: 8px;
 border: 1px solid #BDBDBD;
 outline: none;
`;

export const Add = () => {
  const [toDo, setToDo] = useState('');
  const navigate = useNavigate();

  const addToDo = (): void => {
    if (toDo === '') return;

    const list = JSON.parse(localStorage.getItem('ToDoList') || '[]');
    localStorage.setItem('ToDoList', JSON.stringify([...list, toDo]));
    navigate('/');
  };

  return (
    <Container>
      <Input placeholder={"할 일을 입력해 주세요"}
             onChange={(event) => setToDo(event.target.value)}
      />
      <Button label={"추가"}
              onClick={addToDo}
      />
    </Container>
  );
};
