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
  }, [data?.page]);

  return (
    <div className={styles.container}>
      <section>
        <input
          type={"text"}
          placeholder={"Search for a movie"}
          onChange={handleSearch}
        />
        <br />
        {!isEmpty(searchStr) && isLoading && <span>Fetching results...</span>}
      </section>

      <section>
        {isLoading ? null : movies.length > 0 && !isEmpty(searchStr) ? null : (
          <p>No Result found</p>
        )}

        {movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}

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
