import {START_INDEX} from '../const';

export default class Movies {
  constructor() {
    this._movies = [];

    this._dataChangeHandlers = [];
  }

  getMovies() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

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
