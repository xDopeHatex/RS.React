import './App.scss';
import { ChangeEvent, Component, FormEvent } from 'react';
import SearchBar from './components/SearchBar.tsx';
import Header from './components/Header.tsx';
import { getAnimeByName } from './services/api.ts';
import Wrapper from './components/UI/Wrapper.tsx';
import Card from './components/UI/Card.tsx';

type AnimeItem = {
  genres: { name: string }[];
  images: { jpg: { large_image_url: string } };
  title_english: string;
  title: string;
  title_japanese: string;
};

type State = {
  animeName: string;
  animeList: AnimeItem[];
  firstLoad: boolean;
};

export default class App extends Component<{}, State> {
  state: State = {
    animeName: localStorage.getItem('animeName') || '',
    animeList: [],
    firstLoad: true,
  };

  setAnimeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState((prev) => {
      return { ...prev, animeName: e.target.value.toLowerCase().trim() };
    });
  };

  getAnimeList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('animeName', this.state.animeName);
    this.setState((prev) => {
      return { ...prev, firstLoad: false };
    });
    try {
      const {
        data: { data },
      }: { data: { data: AnimeItem[] } } = await getAnimeByName(
        this.state.animeName
      );

      this.setState((prev) => {
        return { ...prev, animeList: data };
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  async componentDidMount() {
    if (this.state.animeName) {
      this.setState((prev) => {
        return { ...prev, firstLoad: false };
      });
      try {
        const {
          data: { data },
        }: { data: { data: AnimeItem[] } } = await getAnimeByName(
          this.state.animeName
        );

        this.setState((prev) => {
          return { ...prev, animeList: data };
        });
      } catch (error) {
        console.error('Error fetching data:', error); // Handle errors gracefully
      }
    }
  }

  render() {
    const { animeList } = this.state;
    const { animeName } = this.state;
    const { firstLoad } = this.state;

    return (
      <div className="App">
        <Header />
        <SearchBar
          value={animeName}
          onChange={this.setAnimeNameHandler}
          onSubmit={this.getAnimeList}
        />
        <Wrapper>
          {animeList?.length < 1 &&
            ((firstLoad && (
              <h2>Here's gonna be list of anime after you submit a name</h2>
            )) || <h2>Sorry, there's nothing to show. Try again</h2>)}
          <div className="table grid-parent">
            {animeList.map(
              ({
                title_english,
                title_japanese,
                title,
                images: {
                  jpg: { large_image_url },
                },
              }) => (
                <div className="grid-child">
                  <Card
                    title={title_english || title || title_japanese}
                    imgLink={large_image_url}
                  />
                </div>
              )
            )}
          </div>
        </Wrapper>
      </div>
    );
  }
}
