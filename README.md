## Simple Movie Database App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Enviroment Setup

First, copy and rename .env.example to .env

```bash
# Mac/Linux
cp .env.example .env
```

Follow the guide at [TheMovieDB](https://developers.themoviedb.org/3/getting-started/introduction) to generate a v3 API Key, if you don't already have one (very important).

Afterwards, copy the API Key and set it as the value to `NEXT_PUBLIC_MOVIE_DB_API_KEY_V3` in the `.env` file

```
NEXT_PUBLIC_MOVIE_DB_API_KEY_V3="PUT_API_KEY_HERE"
```

### Installation

Install all dependencies

```bash
npm install
# or
yarn
```

Then, run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Try searching for a movie and you should get some results.

You can change the default port by running

```
npm run dev -- --port=3200
# or
yarn dev --port=320
```

## Testing

Testing is powered by the Jest framework. You can run all test cases using

```bash
npm run test
# or
yarn test
```
