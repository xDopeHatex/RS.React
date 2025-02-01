import './App.scss';
import { ChangeEvent, Component, FormEvent } from 'react';
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

type State = {
  animeName: string;
  animeList: AnimeItem[];
  isLoading: boolean;
  errorMessage: string;
  isShowErrorComponent: boolean;
};

export default class App extends Component<{}, State> {
  state: State = {
    animeName: localStorage.getItem('animeName') || '',
    animeList: [],
    isLoading: false,
    errorMessage: '',
    isShowErrorComponent: false,
  };

  createSetStateHandler = (
    value: string | number | boolean,
    stateName: keyof State
  ) =>
    this.setState((prev) => {
      return { ...prev, [stateName]: value };
    });

  setAnimeNameHandler = (e: ChangeEvent<HTMLInputElement>) =>
    this.createSetStateHandler(
      e.target.value.toLowerCase().trim(),
      'animeName'
    );

  setLoadingHandler = (value: boolean) =>
    this.createSetStateHandler(value, 'isLoading');

  setErrorMessageHandler = (value: string) =>
    this.createSetStateHandler(value, 'errorMessage');

  setIsShowErrorComponentHandler = (value: boolean) =>
    this.createSetStateHandler(value, 'isShowErrorComponent');

  fetchAnimeListByName = async () => {
    try {
      const {
        data: { data },
      }: { data: { data: AnimeItem[] } } = await getAnimeByName(
        this.state.animeName
      );

      this.setState((prev) => {
        return { ...prev, animeList: data };
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.setErrorMessageHandler(error.message);
      } else {
        this.setErrorMessageHandler('An unknown error occurred');
      }
    } finally {
      this.setLoadingHandler(false);
    }
  };

  getAnimeList = async (e: FormEvent<HTMLFormElement>) => {
    this.setErrorMessageHandler('');

    this.setLoadingHandler(true);

    e.preventDefault();

    localStorage.setItem('animeName', this.state.animeName);

    await this.fetchAnimeListByName();
  };

  async componentDidMount() {
    this.setLoadingHandler(true);

    await this.fetchAnimeListByName();
  }

  render() {
    const {
      animeList,
      animeName,
      isLoading,
      errorMessage,
      isShowErrorComponent,
    } = this.state;

    return (
      <ErrorBoundary fallback={<FallbackPage />}>
        <div className="App">
          <Header />
          <SearchBar
            value={animeName}
            onChange={this.setAnimeNameHandler}
            onSubmit={this.getAnimeList}
          />
          <Wrapper>
            <Button
              title={'Error Boundary Test'}
              onClick={() => this.setIsShowErrorComponentHandler(true)}
            />

            {isShowErrorComponent && <ErrorComponent />}
          </Wrapper>
          <Wrapper>
            {errorMessage ? (
              <h2>{errorMessage}</h2>
            ) : animeList?.length < 1 && !isLoading ? (
              <h2>Sorry, there's nothing to show. Try again</h2>
            ) : isLoading ? (
              <div className="spinner-wrapper">
                <Spinner />
              </div>
            ) : (
              <div className="table grid-parent">
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
  }
}
