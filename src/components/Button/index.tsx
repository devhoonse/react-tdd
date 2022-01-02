import React from 'react';
import styled from "styled-components";


interface ContainerProps {
  readonly backgroundColor?: string;
  readonly hoverColor?: string;
}
const Container = styled.div<ContainerProps>`
 text-align: center;
 padding: 10px 20px;
 border-radius: 8px;
 cursor: pointer;
 background-color: ${props => props.backgroundColor};
 &:hover {
  background-color: ${props => props.hoverColor};
 }
 &:active {
  box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
 }
`;
const Label = styled.div`
 color: #FFFFFF;
 font-size: 16px;
`;


interface Props extends ContainerProps {
  readonly label: string;
  readonly onClick?: (...args: any[]) => void;
}
export const Button = ({label, onClick, backgroundColor = '#304FFE', hoverColor = '#1E40FF'}: Props) => {
  return (
    <Container backgroundColor={backgroundColor}
               hoverColor={hoverColor}
               onClick={onClick}
    >
      <Label>{label}</Label>
    </Container>
  );
};
