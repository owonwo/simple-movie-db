export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  getYear(): string;
  getPosterPath(): string;
};

type Genre = {
  id: number;
  name: string;
};

export type MovieAttributes = {
  overview: string;
  tagline: string;
  genres: Genre[];
};
