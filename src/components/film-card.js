import AbctractComponent from './abstract-component';

const DESCRIPTION_LENGTH = 140;

const createFilmCardTemplate = (film) => {
  const {
    title,
    releaseDate,
    posterSrc,
    genres,
    description,
    duration,
    rating,
    comments,
    isInWatchlist,
    isWatched,
    isFavourite,
  } = film;

  const releaseYear = `${releaseDate.getFullYear()}`;
  const genre = genres[0];

  const watchlistActiveClass = isInWatchlist ? `film-card__controls-item--active` : ``;
  const watchedActiveClass = isWatched ? `film-card__controls-item--active` : ``;
  const favouriteActiveClass = isFavourite ? `film-card__controls-item--active` : ``;

  let shortDescription = description;

  if (shortDescription.length > DESCRIPTION_LENGTH) {
    shortDescription = `${shortDescription.slice(0, DESCRIPTION_LENGTH - 1)}...`;
  }

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${posterSrc}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="
          film-card__controls-item
          button film-card__controls-item--add-to-watchlist
          ${watchlistActiveClass}
        ">Add to watchlist</button>
        <button class="
          film-card__controls-item button
          film-card__controls-item--mark-as-watched
          ${watchedActiveClass}
        ">Mark as watched</button>
        <button class="
          film-card__controls-item button
          film-card__controls-item--favorite
          ${favouriteActiveClass}
        ">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbctractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }
}
