import React from "react";
import useSWR from "swr";
import { debounce, isEmpty } from "lodash";
import { searchForMovie, fetcher } from "../libs/api";
import { MovieFactory } from "../libs/factories";
import styles from "../styles/Home.module.css";
import { MovieCard } from "../components/MovieCard";

export default function Home() {
  const [searchStr, setSearchStr] = React.useState("");
  const { data, error } = useSWR(
    () => (!isEmpty(searchStr) ? searchForMovie({ searchStr }) : null),
    fetcher
  );

  const handleSearch = React.useCallback(
    debounce(({ target }) => setSearchStr(target.value), 500),
    []
  );

  const isLoading = !error && !data;
  const movies = MovieFactory.collection(data?.results || []);

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
      </section>
    </div>
  );
}
