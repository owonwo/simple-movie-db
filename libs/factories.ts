import { Movie } from "./types";

const MovieProto = {
  release_date: null,
  poster_path: null,
  getYear(): string {
    if (!this.release_date) return "";
    return new Date(this.release_date!).getFullYear().toString();
  },
  getPosterPath() {
    return `https://image.tmdb.org/t/p/original${this.poster_path}`;
  },
};

export class MovieFactory {
  static create<T extends Movie>(item: Record<string, any>): T {
    return Object.assign(Object.create(MovieProto), item);
  }

  static collection(items: any[]): Movie[] {
    return items.map(MovieFactory.create);
  }
}
