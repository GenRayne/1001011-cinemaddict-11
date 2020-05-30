import Movie from '../models/movie';
import Comment from '../models/Comment';
import {nanoid} from 'nanoid';

const COMMENTS_KEY = `comments`;
const AUTHOR_NAME = `Unknown Author`;

const isOnline = () => {
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
    return Promise.resolve(Movie.parseMovies(storeMovies));
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
    if (isOnline()) {
      return this._api.getMovieComments(movieId)
        .then((comments) => {
          this._store.setItemChild(COMMENTS_KEY, movieId, comments);
          return comments;
        });
    }
    const storeComments = this._store.getItemChild(COMMENTS_KEY, movieId);
    if (Object.values(storeComments).length) {
      return Promise.resolve(storeComments);
    }
    return Promise.resolve();
  }

  createComment(newComment, movieId) {
    if (isOnline()) {
      return this._api.createComment(newComment, movieId)
      .then((comments) => {
        comments.forEach((comment) => comment.toRAW());

        this._store.setItemChild(COMMENTS_KEY, movieId, comments);
        return comments;
      });
    }
    const localCommentId = nanoid();
    const localCommentAuthor = AUTHOR_NAME;
    const localComment = Comment.clone(Object.assign(newComment, {
      id: localCommentId,
      username: localCommentAuthor
    }));

    const storeComments = this._store.getItemChild(COMMENTS_KEY, movieId);
    const storeCommentsIds = storeComments.map((item) => item.id);
    storeComments.push(localComment);
    storeCommentsIds.push(localComment.id);

    this._store.setItemChild(COMMENTS_KEY, movieId, storeComments);
    this._store.setItemChild(movieId, COMMENTS_KEY, storeCommentsIds);

    return Promise.resolve(storeComments);
  }

  deleteComment(commentId, movieId) {
    if (isOnline()) {
      return this._api.deleteComment(commentId)
        .then(() => this._store.removeItemChild(COMMENTS_KEY, movieId, commentId));
    }

    this._store.removeItemChild(COMMENTS_KEY, movieId, commentId);
    this._store.removeItemChild(movieId, COMMENTS_KEY, commentId);

    return Promise.resolve();
  }
}
