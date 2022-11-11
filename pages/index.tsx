import React from "react";
import useSWR from "swr";
import { debounce, isArray, isEmpty } from "lodash";
import { searchForMovie, fetcher } from "../libs/api";
import { MovieFactory } from "../libs/factories";
import styles from "../styles/Home.module.css";
import { MovieCard } from "../components/MovieCard";
import { LoadMore } from "../components/LoadMore";
import { Movie } from "../libs/types";

export default function Home() {
  const [searchStr, setSearchStr] = React.useState("");
  const [resultMeta, setResultMeta] = React.useState({
    page: 1,
    totalPage: 1,
  });
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const { data, error } = useSWR(
    () =>
      !isEmpty(searchStr)
        ? searchForMovie({ searchStr, page: resultMeta.page })
        : null,
    fetcher
  );
  const isLoading = !error && !data;

  const handleSearch = React.useCallback(
    debounce(({ target }) => {
      setMovies([]);
      setResultMeta({ page: 1, totalPage: 1 });
      setSearchStr(target.value.trim());
    }, 500),
    []
  );

  React.useEffect(() => {
    if (data?.page && data?.total_pages)
      setResultMeta({
        page: data?.page,
        totalPage: data?.total_pages,
      });
  }, [data]);

  React.useEffect(() => {
    if (isArray(data?.results)) {
      setMovies((arr) => arr.concat(MovieFactory.collection(data.results)));
    }
  }, [String(searchStr + data?.page)]);

  return (
    <div className={styles.container}>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <br />
        <h1>Simple Movie App</h1>
        <input
          type={"text"}
          placeholder={"Search for a movie"}
          onChange={handleSearch}
          style={{
            margin: "0 auto 24px",
            border: "solid 1px white",
            padding: 16,
            fontSize: 16,
            borderRadius: 12,
            width: "max(200px, 40%)",
          }}
        />
        <br />
        {!isEmpty(searchStr) && isLoading && <span>Fetching results...</span>}
      </section>

      <section>
        {isLoading ? null : movies.length > 0 && !isEmpty(searchStr) ? null : (
          <p>No Result found</p>
        )}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {!isEmpty(movies) && (
          <LoadMore
            currentPage={resultMeta.page}
            totalPages={resultMeta.totalPage}
            onLoadMore={() =>
              setResultMeta((meta) => ({ ...meta, page: meta.page + 1 }))
            }
          />
        )}
      </section>
    </div>
  );
}
