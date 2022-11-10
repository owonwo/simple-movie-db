export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  getYear(): string;
  getPosterPath(): string;
};
