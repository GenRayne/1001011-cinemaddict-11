export default class Movie {
  constructor(data) {
    this.id = data.id;
    this.title = data[`film_info`].title;
    this.alternativeTitle = data[`film_info`][`alternative_title`];
    this.posterSrc = data[`film_info`].poster;
    this.description = data[`film_info`].description;

    this.age = data[`film_info`][`age_rating`];
    this.genres = data[`film_info`].genre;
    this.duration = data[`film_info`].runtime;
    this.rating = data[`film_info`][`total_rating`];

    this.releaseDate = new Date(data[`film_info`].release.date);
    this.country = data[`film_info`].release[`release_country`];

    this.director = data[`film_info`].director;
    this.writers = data[`film_info`].writers;
    this.actors = data[`film_info`].actors;

    this.isInWatchlist = data[`user_details`].watchlist;
    this.isWatched = data[`user_details`][`already_watched`];
    this.isFavourite = data[`user_details`].favorite;
    this.watchingDate = new Date(data[`user_details`][`watching_date`]);

    this.commentIds = data.comments;
    this.comments = [];
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
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

  static clone(data) {
    return new Movie(data.toRAW());
  }
}
