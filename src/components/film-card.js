import AbstractSmartComponent from './abstract-smart-component';

const DESCRIPTION_LENGTH = 140;

const BtnName = {
  WATCHLIST: `Add to watchlist`,
  WATCHED: `Mark as watched`,
  FAVOURITE: `Mark as favorite`
};

const BtnClass = {
  WATCHLIST: `film-card__controls-item--add-to-watchlist`,
  WATCHED: `film-card__controls-item--mark-as-watched`,
  FAVOURITE: `film-card__controls-item--favorite`
};

const creatBtn = (name, className, isActive = false) => {
  return (
    `<button class="
      film-card__controls-item
      button
      ${className}
      ${isActive ? `film-card__controls-item--active` : ``}
    ">${name}</button>`
  );
};

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

  let shortDescription = description;

  if (shortDescription.length > DESCRIPTION_LENGTH) {
    shortDescription = `${shortDescription.slice(0, DESCRIPTION_LENGTH - 1)}...`;
  }

  const watchlistBtn = creatBtn(BtnName.WATCHLIST, BtnClass.WATCHLIST, isInWatchlist);
  const watchedBtn = creatBtn(BtnName.WATCHED, BtnClass.WATCHED, isWatched);
  const favouriteBtn = creatBtn(BtnName.FAVOURITE, BtnClass.FAVOURITE, isFavourite);

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
        ${watchlistBtn}
        ${watchedBtn}
        ${favouriteBtn}
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setElementClickHandler(handler, selector) {
    this.getElement().querySelector(selector)
      .addEventListener(`click`, handler);
  }

  setWatchlistIconClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedIconClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavouriteIconClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
