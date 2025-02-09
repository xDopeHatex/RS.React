import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from '../../../components/UI/Card.tsx';
import { describe, test, expect } from 'vitest';

describe('Card Component', () => {
  const mockProps = {
    title: 'Naruto',
    imgLink: 'https://example.com/naruto.jpg',
    description: 'A popular anime about a ninja',
    id: 123,
  };

  test('renders Card component correctly', () => {
    render(
      <MemoryRouter>
        <Card {...mockProps} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();

    expect(screen.getByText(mockProps.description)).toBeInTheDocument();

    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', mockProps.imgLink);
    expect(imgElement).toHaveAttribute(
      'alt',
      `image of the ${mockProps.title} anime`
    );
  });

  test('renders correct link with query params', () => {
    render(
      <MemoryRouter>
        <Card {...mockProps} />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/details/?id=${mockProps.id}`);
  });
});
