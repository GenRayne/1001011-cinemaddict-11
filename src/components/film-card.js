import AbstractSmartComponent from './abstract-smart-component';
import moment from "moment";
import {getDuration} from '../utils/common';

const DESCRIPTION_LENGTH = 140;

const buttonSettings = {
  watchlist: {
    label: `Add to watchlist`,
    className: `film-card__controls-item--add-to-watchlist`
  },
  watched: {
    label: `Mark as watched`,
    className: `film-card__controls-item--mark-as-watched`
  },
  favourite: {
    label: `Mark as favorite`,
    className: `film-card__controls-item--favorite`
  },
};

const createBtn = ({label, className}, isActive = false) => {
  return (
    `<button class="
      film-card__controls-item
      button
      ${className}
      ${isActive ? `film-card__controls-item--active` : ``}
    ">${label}</button>`
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
    commentIds,
    isInWatchlist,
    isWatched,
    isFavourite,
  } = film;

  const releaseYear = moment(releaseDate).format(`YYYY`);
  const genre = genres[0];

  let shortDescription = description;
  const filmDuration = getDuration(duration);

  if (shortDescription.length > DESCRIPTION_LENGTH) {
    shortDescription = `${shortDescription.slice(0, DESCRIPTION_LENGTH - 1)}...`;
  }

  const watchlistBtn = createBtn(buttonSettings.watchlist, isInWatchlist);
  const watchedBtn = createBtn(buttonSettings.watched, isWatched);
  const favouriteBtn = createBtn(buttonSettings.favourite, isFavourite);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${filmDuration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${posterSrc}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${commentIds.length} comments</a>
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

  rerender() {
    super.rerender(this);
  }

  recoverListeners() {
    this.setPosterClickHandler(this._posterClickHandler);
    this.setTitleClickHandler(this._titleClickHandler);
    this.setCommentsClickHandler(this._commentsClickHandler);
    this.setWatchlistIconClickHandler(this._watchlistBtnClickHandler);
    this.setWatchedIconClickHandler(this._watchedIconClickHandler);
    this.setFavouriteIconClickHandler(this._favouriteIconClickHandler);
  }

  // ------------------------------- Слушатели -------------------------------

  setPosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);

    this._posterClickHandler = handler;
  }

  setTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);

    this._titleClickHandler = handler;
  }

  setCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);

    this._commentsClickHandler = handler;
  }

  // ---------------------------------------

  setWatchlistIconClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);

    this._watchlistIconClickHandler = handler;
  }

  setWatchedIconClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);

    this._watchedIconClickHandler = handler;
  }

  setFavouriteIconClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);

    this._favouriteIconClickHandler = handler;
  }
}
