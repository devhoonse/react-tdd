import React from "react";
import {MemoryRouter, Routes, Route, useLocation} from "react-router-dom";
import {render, screen, fireEvent} from "@testing-library/react";
import 'jest-styled-components';

import {Detail} from './index';


describe('<Detail />', () => {
  it('renders component correctly', () => {
    localStorage.setItem('ToDoList', '["ToDo 1","ToDo 2"]');
    const {container} = render(
      <MemoryRouter initialEntries={["/detail/1"]}>
        <Routes>
          <Route path={"/detail/:id"} element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );
    const toDoItem = screen.getByText('ToDo 2');
    expect(toDoItem).toBeInTheDocument();
    const button = screen.getByText('삭제');
    expect(button).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('redirect to NotFound page if todo id is wrong', () => {
    localStorage.clear();
    const TestComponent = (): JSX.Element => {
      const {pathname} = useLocation();
      return (
        <div>{pathname}</div>
      );
    };
    render(
      <MemoryRouter initialEntries={["/detail/1"]}>
        <TestComponent />
        <Routes>
          <Route path={"/detail/:id"} element={<Detail />} />
          <Route path={"/404"} element={<div>404</div>} />
        </Routes>
      </MemoryRouter>
    );
    const url = screen.queryByText('/404');
    expect(url).toBeInTheDocument();
  });

  it('delete a ToDo and redirect to the List page', () => {
    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2"]');
    const TestComponent = (): JSX.Element => {
      const {pathname} = useLocation();
      return (
        <div>{pathname}</div>
      );
    };
    render(
      <MemoryRouter initialEntries={["/detail/1"]}>
        <TestComponent />
        <Routes>
          <Route path={"/detail/:id"} element={<Detail />} />
          <Route path={"/"} element={<div>index</div>} />
        </Routes>
      </MemoryRouter>
    );
    const url = screen.queryByText('/detail/1');
    expect(url).toBeInTheDocument();
    const button = screen.getByText('삭제');
    fireEvent.click(button);
    expect(JSON.parse(localStorage.getItem('ToDoList') as string)).not.toContain('ToDo 2');
    expect(url!.textContent).toBe('/')
  });
});
