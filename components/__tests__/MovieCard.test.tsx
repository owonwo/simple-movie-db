import React from "react";
import pretty from "pretty";
import { render } from "@testing-library/react";
import { MovieCard } from "../MovieCard";
import { MovieFactory } from "../../libs/factories";

const movieData = {
  id: 24,
  title: "The Wondering",
  poster_path: "POSTER_IMAGE_PATH",
  release_date: "2010-12-08",
};

describe("MovieCard component", () => {
  it("should show a placeholder when no image is provided", () => {
    const { container } = render(
      <MovieCard
        movie={MovieFactory.create({ ...movieData, poster_path: null })}
      />
    );

    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<a href="/movie/24">
        <div style="width: 220px; height: 330px;">No Image <br> Available</div>
        <p>The Wondering &nbsp;&nbsp;<span>2010</span></p>
      </a>"
    `);
  });

  it("should correctly when all props are provided", () => {
    const { container } = render(
      <MovieCard movie={MovieFactory.create(movieData) as any} />
    );

    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<a href="/movie/24">
        <div style="width: 220px; height: 330px;"><img alt="The Wondering" srcset="/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2ForiginalPOSTER_IMAGE_PATH&amp;w=256&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2ForiginalPOSTER_IMAGE_PATH&amp;w=640&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2ForiginalPOSTER_IMAGE_PATH&amp;w=640&amp;q=75" width="220" height="330" decoding="async" data-nimg="1" loading="lazy" style="color: transparent;"></div>
        <p>The Wondering &nbsp;&nbsp;<span>2010</span></p>
      </a>"
    `);
  });
});
