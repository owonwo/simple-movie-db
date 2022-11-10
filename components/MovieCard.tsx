import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Movie } from "../libs/types";

export const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <Link key={movie.id} href={`/movie/${movie.id}`}>
      <div style={{ width: 220, height: 330 }}>
        {movie.poster_path ? (
          <Image
            src={movie.getPosterPath()}
            alt={movie.title}
            width={220}
            height={330}
          />
        ) : (
          <>
            No Image <br /> Available
          </>
        )}
      </div>

      <p>
        {movie.title} &nbsp;&nbsp;
        <span>{movie.getYear()}</span>
      </p>
    </Link>
  );
};
