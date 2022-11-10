import React from "react";
import { fetcher, getMovie } from "../../libs/api";
import { MovieFactory } from "../../libs/factories";
import { Movie, MovieAttributes } from "../../libs/types";
import { GetServerSideProps } from "next";
import Image from "next/image";

export default function MoviePage({
  movie: movie_,
}: {
  movie: Movie & MovieAttributes;
}) {
  const movie = MovieFactory.create(movie_);

  return (
    <div>
      <Image
        src={movie.getPosterPath()}
        width={220}
        height={330}
        alt={movie.title}
      />
      <h1>{movie.title}</h1>
      <h4>{movie.overview}</h4>
      <p>
        {movie.genres.map((genre) => (
          <React.Fragment key={genre.id}>
            <span>{genre.name}</span>&nbsp;&nbsp;
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    if (!ctx.query?.id)
      return {
        notFound: true,
      };

    const movie = await fetcher(getMovie(ctx.query?.id as string));

    return {
      props: {
        movie,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
