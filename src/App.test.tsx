import React from 'react';
import {MemoryRouter} from "react-router-dom";
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText('할 일 목록🗃');
  expect(linkElement).toBeInTheDocument();
});