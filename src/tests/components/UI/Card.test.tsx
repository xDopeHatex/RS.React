import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from '../../../components/UI/Card';
import { describe, test, expect } from 'vitest';
import ThemeProvider from '../../../providers/ThemeProvider.tsx';
import { Provider } from 'react-redux';
import store from '../../../store/store.ts';
import { AnimeItem } from '../../../services/apiSlices.types.ts';

export const dummyAnimeFullInfo: AnimeItem = {
  genres: [{ name: 'Action' }, { name: 'Adventure' }, { name: 'Fantasy' }],
  title_english: 'Naruto',
  title: 'Naruto',
  title_japanese: 'ナルト',
  mal_id: 20,
  episodes: 220,
  status: 'Finished Airing',
  aired: {
    prop: {
      from: { day: 3, month: 10, year: 2002 },
      to: { day: 8, month: 2, year: 2007 },
    },
  },
  score: 7.9,
  synopsis:
    'Naruto follows the story of Naruto Uzumaki, a young ninja with dreams of becoming the strongest and earning the respect of his peers.',
  images: { jpg: { large_image_url: 'https://example.com/naruto.jpg' } },
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
