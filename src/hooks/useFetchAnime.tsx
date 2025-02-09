import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { getAnimeTitles } from '../services/api.ts';
import { AxiosError } from 'axios';
import { PaginationProps } from '../views/Layout.tsx';

type AnimeItem = {
  genres: { name: string }[];
  images: { jpg: { large_image_url: string } };
  title_english: string;
  title: string;
  title_japanese: string;
  synopsis: string;
  mal_id: number;
};

const useFetchAnime = () => {
  const [animeName, setAnimeName] = useState(
    localStorage.getItem('animeName') || ''
  );
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState<PaginationProps>({
    isFirstPage: false,
    isLastPage: false,
    lastPage: null,
  });

  const fetchAnimeListBySearchParams = async (
    searchParamsProps: URLSearchParams
  ) => {
    setIsLoading(true);
    try {
      const {
        data,
      }: {
        data: {
          pagination: {
            current_page: number;
            has_next_page: boolean;
            last_visible_page: number;
          };
          data: AnimeItem[];
        };
      } = await getAnimeTitles(searchParamsProps);
      setPagination({
        isFirstPage: data.pagination.current_page == 1,
        isLastPage: !data.pagination.has_next_page,
        lastPage: data.pagination.last_visible_page,
      });

      setAnimeList(data.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const url = new URLSearchParams(searchParams.toString());

    if (!location.search && localStorage.getItem('animeName')) {
      const animeName = localStorage.getItem('animeName') || '';
      setSearchParams({ q: animeName, limit: '4', page: '1' });
      url.set('q', animeName);
      url.set('limit', '4');
      url.set('page', '1');
    } else if (!location.search && !localStorage.getItem('animeName')) {
      setSearchParams({ q: '', limit: '4', page: '1' });
      url.set('q', '');
      url.set('limit', '4');
      url.set('page', '1');
    }

    const fetchData = async () => await fetchAnimeListBySearchParams(url);
    fetchData();
  }, []);

  const getAnimeList = async (e: FormEvent<HTMLFormElement>) => {
    setErrorMessage('');
    e.preventDefault();
    localStorage.setItem('animeName', animeName);
    const url = new URLSearchParams(searchParams.toString());
    setSearchParams(() => ({ q: animeName, limit: '4', page: '1' }));
    url.set('q', animeName);
    url.set('limit', '4');
    url.set('page', '1');
    await fetchAnimeListBySearchParams(url);
  };

  return {
    getAnimeList,
    animeList,
    animeName,
    setAnimeName,
    fetchAnimeListBySearchParams,
    isLoading,
    errorMessage,
    pagination,
  };
};

export default useFetchAnime;
