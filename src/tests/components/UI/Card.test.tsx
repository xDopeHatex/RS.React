import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from '../../../components/UI/Card';
import { describe, test, expect } from 'vitest';
import ThemeProvider from '../../../providers/ThemeProvider.tsx';
import { Provider } from 'react-redux';
import store from '../../../store/store.ts';

const dummyAnimeFullInfo = {
  id: 123,
  title: 'Naruto',
  imgLink: 'https://example.com/naruto.jpg',
  description: 'A popular anime about a ninja',
};

describe('Card Component', () => {
  const mockProps = {
    title: 'Naruto',
    imgLink: 'https://example.com/naruto.jpg',
    description: 'A popular anime about a ninja',
    id: 123,
    animeFullInfo: dummyAnimeFullInfo,
  };

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <Card {...mockProps} />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

  test('renders Card component correctly', () => {
    renderComponent();

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
    renderComponent();
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute(
      'href',
      `/home/details/?id=${mockProps.id}`
    );
  });
});
