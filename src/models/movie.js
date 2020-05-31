export default class Movie {
  constructor(movie) {
    this.id = movie.id;
    this.title = movie[`film_info`].title;
    this.alternativeTitle = movie[`film_info`][`alternative_title`];
    this.posterSrc = movie[`film_info`].poster;
    this.description = movie[`film_info`].description;

    this.age = movie[`film_info`][`age_rating`];
    this.genres = movie[`film_info`].genre;
    this.duration = movie[`film_info`].runtime;
    this.rating = movie[`film_info`][`total_rating`];

    this.releaseDate = new Date(movie[`film_info`].release.date);
    this.country = movie[`film_info`].release[`release_country`];

    this.director = movie[`film_info`].director;
    this.writers = movie[`film_info`].writers;
    this.actors = movie[`film_info`].actors;

    this.isInWatchlist = movie[`user_details`].watchlist;
    this.isWatched = movie[`user_details`][`already_watched`];
    this.isFavourite = movie[`user_details`].favorite;
    this.watchingDate = new Date(movie[`user_details`][`watching_date`]);

    this.commentIds = movie.comments;
    this.comments = [];
  }

  static parseMovie(movie) {
    return new Movie(movie);
  }

  static parseMovies(movies) {
    return movies.map(Movie.parseMovie);
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.commentIds,
      'film_info': {
        'actors': this.actors,
        'age_rating': this.age,
        'alternative_title': this.alternativeTitle,
        'description': this.description,
        'director': this.director,
        'genre': this.genres,
        'poster': this.posterSrc,
        'release': {
          'date': this.releaseDate,
          'release_country': this.country,
        },
        'runtime': this.duration,
        'title': this.title,
        'total_rating': this.rating,
        'writers': this.writers,
      },
      'user_details': {
        'already_watched': this.isWatched || false,
        'favorite': this.isFavourite || false,
        'watching_date': this.watchingDate,
        'watchlist': this.isInWatchlist || false,
      }
    };
  }

  static clone(movie) {
    return new Movie(movie.toRAW());
  }
}
