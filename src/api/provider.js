import Movie from '../models/movie';

const FAILED_SYNC_TEXT = `Synchronization failed`;

export const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;

    this._isChangedOffline = false;
  }

  checkIfChangeOffline() {
    return this._isChangedOffline;
  }

  getMovies() {
    if (isOnline()) {
      return this._api.getMovies()
        .then((movies) => {
          const items = movies.reduce((acc, movie) => {
            return Object.assign({}, acc, {[movie.id]: movie.toRAW()});
          }, {});
          this._store.setItems(items);

          this._isChangedOffline = false;
          return movies;
        });
    }
    const storeMovies = Object.values(this._store.getItems());
    const parsedMovies = Movie.parseMovies(storeMovies);
    return Promise.resolve(parsedMovies);
  }

  updateMovie(id, movie) {
    if (isOnline()) {
      return this._api.updateMovie(id, movie)
        .then((newMovie) => {
          this._store.setItem(newMovie.id, newMovie.toRAW());
          return newMovie;
        });
    }
    const localMovie = Movie.clone(Object.assign(movie, {id}));
    this._store.setItem(id, localMovie.toRAW());

    this._isChangedOffline = true;
    return Promise.resolve(localMovie);
  }

  getMovieComments(movieId) {
    return this._api.getMovieComments(movieId)
    .catch(() => {
      return Promise.resolve([]);
    });
  }

  createComment(newComment, movieId) {
    return this._api.createComment(newComment, movieId);
  }

  deleteComment(commentId) {
    return this._api.deleteComment(commentId);
  }

  sync() {
    if (isOnline()) {
      const storeMovies = Object.values(this._store.getItems());

      return this._api.sync(storeMovies)
        .then((response) => {
          const updatedMovies = response.updated;
          this._store.setItems(updatedMovies);

          return updatedMovies;
        });
    }

    return Promise.reject(new Error(FAILED_SYNC_TEXT));
  }
}
