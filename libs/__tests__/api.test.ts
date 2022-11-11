import { basePath, getMovie, searchForMovie } from "../api";

beforeAll(() => {
  process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY_V3 = "MOCK_DB_API_KEY";
});

it("should add base url and apiKey", () => {
  expect(basePath("/api/movies")).toEqual(
    "https://api.themoviedb.org/3/api/movies?api_key=MOCK_DB_API_KEY"
  );

  expect(searchForMovie({ searchStr: "The Wondering" })).toEqual(
    "https://api.themoviedb.org/3/search/movie?query=The%2520Wondering&api_key=MOCK_DB_API_KEY"
  );

  expect(
    searchForMovie({ searchStr: "The Wondering", page: 2 })
  ).toMatchInlineSnapshot(
    `"https://api.themoviedb.org/3/search/movie?query=The%2520Wondering&page=2&api_key=MOCK_DB_API_KEY"`
  );

  expect(getMovie("23")).toMatchInlineSnapshot(
    `"https://api.themoviedb.org/3/movie/23?api_key=MOCK_DB_API_KEY"`
  );
});
