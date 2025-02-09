import { ChangeEvent, useState } from 'react';
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

export interface PaginationProps {
  isFirstPage: boolean;
  isLastPage: boolean;
  lastPage: null | number;
}

const Layout = () => {
  const [isShowErrorComponent, setIsShowErrorComponent] = useState(false);
  const [searchParams] = useSearchParams();

  const {
    animeList,
    getAnimeList,
    animeName,
    setAnimeName,
    fetchAnimeListBySearchParams,
    pagination,
    errorMessage,
    isLoading,
  } = useFetchAnime();

  return (
    <div data-testid="layout" className=" h-screen w-screen">
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
