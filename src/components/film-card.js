import {createElement} from '../utils';

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
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${posterSrc}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="
          film-card__controls-item
          button film-card__controls-item--add-to-watchlist
          ${isInWatchlist ? `film-card__controls-item--active` : ``}
        ">Add to watchlist</button>
        <button class="
          film-card__controls-item button
          film-card__controls-item--mark-as-watched
          ${isWatched ? `film-card__controls-item--active` : ``}
        ">Mark as watched</button>
        <button class="
          film-card__controls-item button
          film-card__controls-item--favorite
          ${isFavourite ? `film-card__controls-item--active` : ``}
        ">Mark as favorite</button>
      </form>
    </article>`
  );
};

export {createFilmCardTemplate};

export default class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
