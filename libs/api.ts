export const fetcher = (...args: Parameters<typeof fetch>) => {
  return fetch(...args).then((res) => res.json());
};

export const basePath = (
  path: string,
  searchParams?: Record<string, string>
) => {
  const query = new URLSearchParams(searchParams);

  if (process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY_V3)
    query.set("api_key", process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY_V3);

  return `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}?` + query.toString();
};

export const searchForMovie = (params: { searchStr: string; page: number }) => {
  return basePath(`/search/movie`, {
    query: encodeURI(params.searchStr),
    page: String(params.page),
  });
};

export const getMovie = (id: string) => basePath(`/movie/${id}`);
