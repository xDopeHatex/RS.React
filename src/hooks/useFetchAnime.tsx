import { FormEvent, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { useGetAnimeListQuery } from '../services/apiSlices.ts';

const useFetchAnime = () => {
  const animeNameRef = useRef<HTMLInputElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, isError, error } = useGetAnimeListQuery(
    {
      q: searchParams.get('q') || localStorage.getItem('animeName') || '',
      page: Number(searchParams.get('page')),
      limit: Number(searchParams.get('limit')),
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    const url = new URLSearchParams(searchParams.toString());

    if (location.search) {
      const animeName = searchParams.get('q') || '';
      if (animeNameRef.current !== null && animeNameRef.current.value === '') {
        console.log('fire');
        animeNameRef.current.value = animeName;
      }
    } else if (!location.search && localStorage.getItem('animeName')) {
      console.log('heeey');
      const animeName = localStorage.getItem('animeName') || '';

      if (animeNameRef.current !== null) {
        animeNameRef.current.value = animeName;
      }

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
  }, []);

  const getAnimeList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputElement = form.elements[0] as HTMLInputElement;
    localStorage.setItem('animeName', inputElement.value);
    setSearchParams(() => ({
      q: inputElement.value,
      limit: '4',
      page: '1',
    }));
  };

  return {
    animeNameRef,
    getAnimeList,
    animeList: data?.data,
    isLoading,
    isError,
    error,
    pagination: data
      ? {
          isFirstPage: data.pagination.current_page == 1,
          isLastPage: !data.pagination.has_next_page,
          lastPage: data.pagination.last_visible_page,
        }
      : null,
  };
};

export default useFetchAnime;
