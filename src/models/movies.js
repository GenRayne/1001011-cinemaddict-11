import {getMoviesByFilter} from '../utils/filter';
import {START_INDEX, MoviesFilter} from '../const';

export default class Movies {
  constructor() {
    this._movies = [];
    this._activeFilterType = MoviesFilter.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  // ------------------------- Get -------------------------

  getMoviesAll() {
    return this._movies;
  }

  getMovies() {
    return getMoviesByFilter(this._movies, this._activeFilterType);
  }

  // ------------------------- Set -------------------------

  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  // --------------------------------------------------------

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((film) => film.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = []
      .concat(this._movies.slice(START_INDEX, index))
      .concat(movie)
      .concat(this._movies.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);
    return true;
  }
}
