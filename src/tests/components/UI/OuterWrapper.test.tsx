import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';
import OutletWrapper from '../../../components/UI/OutletWrapper.tsx';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('OutletWrapper', () => {
  it('renders the Outlet component', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route path="/" element={<OutletWrapper />}>
            <Route path="home" element={<div>Home Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
