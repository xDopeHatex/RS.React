import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Layout from '../views/Layout';
import Details from '../views/Details';

describe('React Router Navigation', () => {
  it('renders Layout by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('layout')).toBeInTheDocument(); // Update if "Layout" has a different text
  });

  it('navigates to Details page', () => {
    render(
      <MemoryRouter initialEntries={['/details']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="details" element={<Details />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('details')).toBeInTheDocument(); // Update if "Details" has a different text
  });
});
