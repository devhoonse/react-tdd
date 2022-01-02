import React from "react";
import {MemoryRouter} from 'react-router-dom';
import {render, screen, fireEvent} from "@testing-library/react";
import 'jest-styled-components';

import {PageHeader} from './index';


describe('<PageHeader />', () => {
  it('renders component correctly', () => {
    const {container} = render(
      <MemoryRouter initialEntries={["/"]}>
        <PageHeader />
      </MemoryRouter>
    );
    const label = screen.getByText('할 일 목록🗃');
    const goBack = screen.queryByText('돌아가기');
    expect(label).toBeInTheDocument();
    expect(goBack).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders component correctly with /add URL', () => {
    const {container} = render(
      <MemoryRouter initialEntries={["/add"]}>
        <PageHeader />
      </MemoryRouter>
    );
    const label = screen.getByText('할 일 추가🖌');
    const goBack = screen.getByText('돌아가기');
    expect(label).toBeInTheDocument();
    expect(goBack).toBeInTheDocument();
    expect(goBack.getAttribute('href')).toBe('/');
    expect(container).toMatchSnapshot();
  });

  it('renders component correctly with /detail/:id URL', () => {
    render(
      <MemoryRouter initialEntries={["/detail/1"]}>
        <PageHeader />
      </MemoryRouter>
    );
    const label = screen.getByText('할 일 상세🗒');
    const goBack = screen.getByText('돌아가기');
    expect(label).toBeInTheDocument();
    expect(goBack).toBeInTheDocument();
    expect(goBack.getAttribute('href')).toBe('/');
  });

  it('renders component correctly with NotFound URL', () => {
    render(
      <MemoryRouter initialEntries={["/no-such-path"]}>
        <PageHeader />
      </MemoryRouter>
    );
    const label = screen.getByText('에러😿');
    const goBack = screen.getByText('돌아가기');
    expect(label).toBeInTheDocument();
    expect(goBack).toBeInTheDocument();
    expect(goBack.getAttribute('href')).toBe('/');
  });

  it('renders component correctly with goBack link', () => {
    render(
      <MemoryRouter initialEntries={["/no-such-path"]}>
        <PageHeader />
      </MemoryRouter>
    );
    const goBack = screen.getByText('돌아가기');
    fireEvent.click(goBack);
    const label = screen.getByText('할 일 목록🗃');
    expect(label).toBeInTheDocument();
    expect(screen.queryByText('돌아가기')).not.toBeInTheDocument();
  });
});