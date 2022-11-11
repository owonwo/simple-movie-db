import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Movie } from "../libs/types";

export const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <Link
      key={movie.id}
      href={`/movie/${movie.id}`}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        width: 246,
        border: "solid 1px #444",
        padding: 8,
      }}
    >
      <div
        style={{
          width: 220,
          height: 330,
          margin: 4,
        }}
      >
        {movie.poster_path ? (
          <Image
            src={movie.getPosterPath()}
            alt={movie.title}
            width={220}
            height={330}
          />
        ) : (
          <div
            style={{
              width: 220,
              height: 330,
              display: "flex",
              background: "#222",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ textAlign: "center" }}>
              No Image <br /> Available
            </span>
          </div>
        )}
      </div>

      <p>
        {movie.title} &nbsp;&nbsp;
        <span>{movie.getYear()}</span>
      </p>
    </Link>
  );
};
