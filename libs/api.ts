export const fetcher = (...args: Parameters<typeof fetch>) => {
  return fetch(...args).then((res) => res.json());
};

export const searchForMovie = (params: { searchStr: string }) => {
  return `${
    process.env.NEXT_PUBLIC_API_BASE_URL
  }/search/movie?query=${encodeURI(params.searchStr)}&api_key=${
    process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY_V3
  }`;
};

export const getPopularMovies = (searchStr: string) => {
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY_V3}`;
};
