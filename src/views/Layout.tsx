import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar.tsx';
import Header from '../components/Header.tsx';
import { getAnimeTitles } from '../services/api.ts';
import Wrapper from '../components/UI/Wrapper.tsx';
import Card from '../components/UI/Card.tsx';
import Spinner from '../components/UI/Spinner.tsx';
import { AxiosError } from 'axios';
import ErrorComponent from '../components/ErrorComponent.tsx';
import Button from '../components/UI/Button.tsx';
import Pagination from '../components/Pagination.tsx';
import { useSearchParams, useLocation, Outlet } from 'react-router';
import { twMerge } from 'tailwind-merge';

type AnimeItem = {
  genres: { name: string }[];
  images: { jpg: { large_image_url: string } };
  title_english: string;
  title: string;
  title_japanese: string;
  synopsis: string;
  mal_id: number;
};

export interface PaginationProps {
  isFirstPage: boolean;
  isLastPage: boolean;
  lastPage: null | number;
}

const Layout = () => {
  const [animeName, setAnimeName] = useState(
    localStorage.getItem('animeName') || ''
  );
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShowErrorComponent, setIsShowErrorComponent] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
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

  useEffect(() => {
    const url = new URLSearchParams(searchParams.toString());

    if (!location.search && localStorage.getItem('animeName')) {
      const animeName = localStorage.getItem('animeName') || '';
      setSearchParams({ q: animeName, limit: '4', page: '1' });
      url.set('q', animeName);
      url.set('limit', '4');
      url.set('page', '1');
    }

    const fetchData = async () => await fetchAnimeListBySearchParams(url);
    fetchData();
  }, []);

  return (
    <div className=" h-screen w-screen">
      <Header />
      <SearchBar
        name={'search'}
        value={animeName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAnimeName(e.target.value)
        }
        onSubmit={getAnimeList}
      />
      <Wrapper>
        <div className="flex justify-center">
          <div>
            {errorMessage ? (
              <h2>{errorMessage}</h2>
            ) : animeList?.length < 1 && !isLoading ? (
              <h2>Sorry, there is nothing to show. Try again</h2>
            ) : isLoading ? (
              <div className="grid place-content-center w-full">
                <Spinner />
              </div>
            ) : (
              <div
                className={twMerge(
                  'w-full grid gap-20 grid-cols-3 grid-rows-1',
                  searchParams.get('limit') === '6'
                    ? 'grid-cols-3'
                    : 'grid-cols-2'
                )}
              >
                {animeList.map(
                  (
                    {
                      title_english,
                      title_japanese,
                      title,
                      images: {
                        jpg: { large_image_url },
                      },
                      genres,
                      mal_id,
                    },
                    index
                  ) => (
                    <div className="max-h-[250px]" key={index}>
                      <Card
                        id={mal_id}
                        description={genres.map(({ name }) => (
                          <span key={name}>{name}</span>
                        ))}
                        title={title_english || title || title_japanese}
                        imgLink={large_image_url}
                      />
                    </div>
                  )
                )}
              </div>
            )}
            <div className="flex justify-between items-center pt-20">
              <Button
                title={'Error Boundary Test'}
                onClick={() => setIsShowErrorComponent(true)}
              />

              {isShowErrorComponent && <ErrorComponent />}
              {animeList?.length ? (
                <Pagination
                  fetchPage={fetchAnimeListBySearchParams}
                  pagination={pagination}
                />
              ) : null}
            </div>
          </div>
          <Outlet />
        </div>
      </Wrapper>
    </div>
  );
};

export default Layout;
