import React from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { debounce, isEmpty } from "lodash";
import { searchForMovie, fetcher } from "../libs/api";
import { MovieFactory } from "../libs/factories";
import styles from "../styles/Home.module.css";

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
        {movies.length > 0
          ? null
          : !isEmpty(searchStr) && <p>No Result found</p>}

        {movies.map((movie) => {
          return (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              {movie.poster_path ? (
                <Image
                  src={movie.getPosterPath()}
                  alt={movie.title}
                  width={220}
                  height={330}
                />
              ) : (
                <div style={{ width: 220, height: 330 }}>
                  No Image <br /> Available
                </div>
              )}
              <p>
                {movie.title} &nbsp;&nbsp;
                <span>{movie.getYear()}</span>
              </p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
