import { useState } from 'react';
import SearchBar from '../components/SearchBar.tsx';
import Header from '../components/Header.tsx';
import Wrapper from '../components/UI/Wrapper.tsx';
import Card from '../components/UI/Card.tsx';
import Spinner from '../components/UI/Spinner.tsx';
import ErrorComponent from '../components/ErrorComponent.tsx';
import Button from '../components/UI/Button.tsx';
import Pagination from '../components/Pagination.tsx';
import { useSearchParams, Outlet } from 'react-router';
import { twMerge } from 'tailwind-merge';
import useFetchAnime from '../hooks/useFetchAnime.tsx';
import Notification from '../components/Notification.tsx';
import { useTheme } from '../providers/ThemeProvider.tsx';

export interface PaginationProps {
  isFirstPage: boolean;
  isLastPage: boolean;
  lastPage: null | number;
}

const Layout = () => {
  const [isShowErrorComponent, setIsShowErrorComponent] = useState(false);
  const [searchParams] = useSearchParams();
  const theme = useTheme();

  const {
    animeList,
    getAnimeList,
    pagination,
    isError,
    isLoading,
    error,
    animeNameRef,
  } = useFetchAnime();

  return (
    <div
      data-testid="layout"
      className={twMerge(
        'h-screen w-screen relative',
        theme === 'dark' && 'bg-black'
      )}
    >
      <Header />
      <SearchBar
        ref={animeNameRef}
        placeholder={'Type what kind of anime are you looking for?'}
        name={'search'}
        onSubmit={getAnimeList}
      />
      <Wrapper>
        <div className="flex justify-center">
          <div>
            {isError ? (
              <h2>{error?.toString()}</h2>
            ) : !isLoading && animeList?.length === 0 ? (
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
                {animeList?.map((anime, index) => (
                  <div className="max-h-[250px]" key={index}>
                    <Card
                      animeFullInfo={anime}
                      id={anime.mal_id}
                      description={anime.genres.map(({ name }) => (
                        <span key={name}>{name}</span>
                      ))}
                      title={
                        anime.title_english ||
                        anime.title ||
                        anime.title_japanese
                      }
                      imgLink={anime.images.jpg.large_image_url}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-between items-center pt-20">
              <Button
                title={'Error Boundary Test'}
                onClick={() => setIsShowErrorComponent(true)}
              />
              {isShowErrorComponent && <ErrorComponent />}
              {animeList?.length && pagination ? (
                <Pagination pagination={pagination} />
              ) : null}
            </div>
          </div>
          <Outlet />
        </div>
      </Wrapper>
      <Notification />
    </div>
  );
};

export default Layout;
