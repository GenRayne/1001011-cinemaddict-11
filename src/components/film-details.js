import AbstractComponent from "./abstract-component.js";
import {
  formatLongDate,
  getDuration,
  isChecked,
} from '../utils/common';
import {Key} from '../const';

const createFilmDetailsTemplate = (film) => {
  const {
    title,
    alternativeTitle,
    posterSrc,
    releaseDate,
    duration,
    genres,
    director,
    writers,
    actors,
    country,
    description,
    rating,
    age,
    isInWatchlist,
    isWatched,
    isFavourite,
  } = film;

  const dateOfRelease = `${formatLongDate(releaseDate)}`;
  const filmDuration = getDuration(duration);

  const filmWriters = writers.join(`, `);
  const filmActors = actors.join(`, `);

  const filmGenres = genres.map((genre) => `<span class="film-details__genre">${genre}</span>`)
  .join(` `);

  let genresLabel = ``;
  if (genres.length > 0) {
    genresLabel = genres.length > 1 ? `Genres` : `Genre`;
  }

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${posterSrc}" alt="">

              <p class="film-details__age">${age}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${filmWriters}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${filmActors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${dateOfRelease}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${filmDuration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genresLabel}</td>
                  <td class="film-details__cell">
                    ${filmGenres}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input
              type="checkbox"
              class="film-details__control-input visually-hidden"
              id="watchlist"
              name="watchlist"
              ${isChecked(isInWatchlist)}
            >
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input
              type="checkbox"
              class="film-details__control-input visually-hidden"
              id="watched"
              name="watched"
              ${isChecked(isWatched)}
            >
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input
              type="checkbox"
              class="film-details__control-input visually-hidden"
              id="favorite"
              name="favorite"
              ${isChecked(isFavourite)}
            >
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
        </div>
      </form>
    </section>`
  );
};

// ================================================================================

export default class FilmDetails extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  // ------------------------------- Get -------------------------------

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  getCommentsSectionContainer() {
    return this.getElement().querySelector(`.form-details__bottom-container`);
  }

  getFormData() {
    const form = this.getElement().querySelector(`.film-details__inner`);
    return new FormData(form);
  }

  // ----------------------------- Слушатели -----------------------------

  setFormSubmitHandler(handler) {
    this._onCommentSubmit = (evt) => {
      if (evt.key === Key.ENTER && (evt.ctrlKey || evt.metaKey)) {
        handler();
      }
    };

    this.getElement().querySelector(`.film-details__inner`)
      .addEventListener(`keydown`, this._onCommentSubmit);
  }

  removeFormSubmitHandler() {
    if (this._onCommentSubmit) {
      this.getElement().querySelector(`.film-details__inner`)
        .removeEventListener(`keydown`, this._onCommentSubmit);
    }
  }

  // ----------------------------------------

  setCloseBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._closeBtnClickHandler = handler;
  }

  setWatchlistBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);

    this._watchlistBtnClickHandler = handler;
  }

  setWatchedBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);

    this._watchedBtnClickHandler = handler;
  }

  setFavouriteBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);

    this._favouriteBtnClickHandler = handler;
  }
}
