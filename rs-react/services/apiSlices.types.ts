export interface AnimeItem {
  genres: { name: string }[];
  title_english: string;
  title: string;
  title_japanese: string;
  mal_id: number;
  episodes: number;
  status: string;
  aired: {
    prop: {
      from: {
        day: number;
        month: number;
        year: number;
      };
      to: {
        day: number;
        month: number;
        year: number;
      };
    };
  };
  score: number;
  synopsis: string;
  images: { jpg: { large_image_url: string } };
}

export interface AnimeBaseResponse {
  pagination: {
    current_page: number;
    has_next_page: boolean;
    last_visible_page: number;
  };
  data: AnimeItem[];
}
