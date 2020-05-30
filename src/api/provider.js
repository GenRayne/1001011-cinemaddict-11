import Movie from '../models/movie';

export const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getMovies() {
    if (isOnline()) {
      return this._api.getMovies()
        .then((movies) => {
          movies.forEach((movie) => this._store.setItem(movie.id, movie.toRAW()));
          return movies;
        });
    }
    const storeMovies = Object.values(this._store.getItems());
    const parsedMovies = Movie.parseMovies(storeMovies);
    return Promise.resolve(parsedMovies);
  }

  updateMovie(id, data) {
    if (isOnline()) {
      return this._api.updateMovie(id, data)
        .then((newMovie) => {
          this._store.setItem(newMovie.id, newMovie.toRAW());
          return newMovie;
        });
    }
    const localMovie = Movie.clone(Object.assign(data, {id}));
    this._store.setItem(id, localMovie.toRAW());

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
}
