import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import SearchBar from './components/SearchBar.tsx';
import Header from './components/Header.tsx';
import { getAnimeByName } from './services/api.ts';
import Wrapper from './components/UI/Wrapper.tsx';
import Card from './components/UI/Card.tsx';
import Spinner from './components/UI/Spinner.tsx';
import { AxiosError } from 'axios';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import ErrorComponent from './components/ErrorComponent.tsx';
import Button from './components/UI/Button.tsx';
import FallbackPage from './components/UI/FallbackPage.tsx';

type AnimeItem = {
  genres: { name: string }[];
  images: { jpg: { large_image_url: string } };
  title_english: string;
  title: string;
  title_japanese: string;
  synopsis: string;
};

const App = () => {
  const [animeName, setAnimeName] = useState(
    localStorage.getItem('animeName') || ''
  );
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShowErrorComponent, setIsShowErrorComponent] = useState(false);

  const fetchAnimeListByName = async () => {
    setIsLoading(true);
    try {
      const {
        data: { data },
      }: { data: { data: AnimeItem[] } } = await getAnimeByName(animeName);

      setAnimeList(data);
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
    setIsLoading(true);
    e.preventDefault();
    localStorage.setItem('animeName', animeName);
    await fetchAnimeListByName();
  };

  useEffect(() => {
    const fetchData = async () => await fetchAnimeListByName();
    fetchData();
  }, []);

  return (
    <ErrorBoundary fallback={<FallbackPage />}>
      <div className="py-[60px] h-screen w-screen">
        <Header />
        <SearchBar
          value={animeName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAnimeName(e.target.value)
          }
          onSubmit={getAnimeList}
        />
        <Wrapper>
          <Button
            title={'Error Boundary Test'}
            onClick={() => setIsShowErrorComponent(true)}
          />

          {isShowErrorComponent && <ErrorComponent />}
        </Wrapper>
        <Wrapper>
          {errorMessage ? (
            <h2>{errorMessage}</h2>
          ) : animeList?.length < 1 && !isLoading ? (
            <h2>Sorry, there is nothing to show. Try again</h2>
          ) : isLoading ? (
            <div className="grid place-content-center w-full">
              <Spinner />
            </div>
          ) : (
            <div className="w-full grid gap-16 grid-cols-5 grid-rows-[repeat(5,150px)]">
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
                  },
                  index
                ) => (
                  <div className="grid-child" key={index}>
                    <Card
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
        </Wrapper>
      </div>
    </ErrorBoundary>
  );
};

export default App;
