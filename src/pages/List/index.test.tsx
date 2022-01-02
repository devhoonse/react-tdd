import React from "react";
import {MemoryRouter, useLocation} from "react-router-dom";
import {render, screen, fireEvent} from "@testing-library/react";
import 'jest-styled-components';

import {List} from './index';


describe('<List />', () => {
  it('renders component correctly', () => {
    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');
    const {container} = render(
      <MemoryRouter initialEntries={["/"]}>
        <List />
      </MemoryRouter>
    );
    const toDoItem1 = screen.getByText('ToDo 1');
    expect(toDoItem1).toBeInTheDocument();
    const toDoItem2 = screen.getByText('ToDo 2');
    expect(toDoItem2).toBeInTheDocument();
    const toDoItem3 = screen.getByText('ToDo 3');
    expect(toDoItem3).toBeInTheDocument();
    expect(screen.getAllByText('삭제').length).toBe(3);
    expect(container).toMatchSnapshot();
  });

  it('deletes toDo item', () => {
    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');
    render(
      <MemoryRouter initialEntries={["/"]}>
        <List />
      </MemoryRouter>
    );
    const toDoItem = screen.getByText('ToDo 2');
    expect(toDoItem).toBeInTheDocument();
    fireEvent.click(toDoItem.nextElementSibling as HTMLElement);
    expect(screen.queryByText('ToDo 2')).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('ToDoList') as string)).not.toContain('ToDo 2');
    const addButton = screen.getByText('+');
    expect(addButton).toBeInTheDocument();
  });

  it('moves to detail page', () => {
    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');
    const TestComponent = (): JSX.Element => {
      const {pathname} = useLocation();
      return (
        <div>{pathname}</div>
      );
    };
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TestComponent />
        <List />
      </MemoryRouter>
    );
    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();
    const toDoItem1 = screen.getByText('ToDo 2');
    expect(toDoItem1.getAttribute('href')).toBe('/detail/1');
    fireEvent.click(toDoItem1);
    expect(url.textContent).toBe('/detail/1');
  });

  it('moves to add page', () => {
    const TestComponent = (): JSX.Element => {
      const {pathname} = useLocation();
      return (
        <div>{pathname}</div>
      );
    };
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TestComponent />
        <List />
      </MemoryRouter>
    );
    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();
    const addButton = screen.getByText('+');
    expect(addButton.getAttribute('href')).toBe('/add');
    fireEvent.click(addButton);
    expect(url.textContent).toBe('/add');
  });
});