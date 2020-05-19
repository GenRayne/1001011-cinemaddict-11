import {MoviesFilter} from "../const";

export const getWatchlistMovies = (films) => films.filter((film) => film.isInWatchlist);

export const getWatchedMovies = (films) => films.filter((film) => film.isWatched);

export const getFavouriteMovies = (films) => films.filter((film) => film.isFavourite);

export const getMoviesByFilter = (movies, filterType) => {
  switch (filterType) {
    case MoviesFilter.WATCHLIST:
      return getWatchlistMovies(movies);
    case MoviesFilter.HISTORY:
      return getWatchedMovies(movies);
    case MoviesFilter.FAVORITES:
      return getFavouriteMovies(movies);
    default:
      return movies;
  }
};
