import {RenderPosition, Key} from '../const';
import {render, remove, replace} from '../utils/render';
import FilmCard from '../components/film-card';
import FilmDetails from '../components/film-details';

const Mode = {
  DEFAULT: `default`,
  DETAILED: `detailed`
};

const MovieState = {
  WATCHLIST: `isInWatchlist`,
  WATCHED: `isWatched`,
  FAVOURITE: `isFavourite`
};

const bodyElement = document.querySelector(`body`);

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._selectedEmojiPlacement = null;

    this._onEscapePress = this._onEscapePress.bind(this);
    this._onPopupOpen = this._onPopupOpen.bind(this);
    this._onCloseBtnClick = this._onCloseBtnClick.bind(this);

    this._onWatchlistIconClick = this._onWatchlistIconClick.bind(this);
    this._onWatchedIconClick = this._onWatchedIconClick.bind(this);
    this._onFavouriteIconClick = this._onFavouriteIconClick.bind(this);

    this._onWatchlistBtnClick = this._onWatchlistBtnClick.bind(this);
    this._onWatchedBtnClick = this._onWatchedBtnClick.bind(this);
    this._onFavouriteBtnClick = this._onFavouriteBtnClick.bind(this);

    this._onEmojiSelect = this._onEmojiSelect.bind(this);
  }

  setDefaultView() {
    if (!this._mode !== Mode.DEFAULT) {
      remove(this._filmDetailsComponent.getElement());

      if (this._selectedEmojiPlacement) {
        remove(this._selectedEmojiPlacement);
      }
      this._mode = Mode.DEFAULT;
    }
  }

  // ================================== Рендер ==================================

  render(film) {
    const oldFilmComponent = this._filmComponent;

    this._film = film;
    this._filmComponent = new FilmCard(this._film);

    this._filmComponent.setPosterClickHandler(this._onPopupOpen);
    this._filmComponent.setTitleClickHandler(this._onPopupOpen);
    this._filmComponent.setCommentsClickHandler(this._onPopupOpen);

    this._filmComponent.setWatchlistIconClickHandler(this._onWatchlistIconClick);
    this._filmComponent.setWatchedIconClickHandler(this._onWatchedIconClick);
    this._filmComponent.setFavouriteIconClickHandler(this._onFavouriteIconClick);

    if (oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
    } else {
      render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
    }
  }

  // ================================== Обработчики ==================================

  _onEscapePress(evt) {
    if (evt.key === Key.ESCAPE) {
      this.setDefaultView();
      document.removeEventListener(`keydown`, this._onEscapePress);
    }
  }

  _onPopupOpen() {
    this._mode = Mode.DETAILED;

    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmDetailsComponent = new FilmDetails(this._film);
    this._filmDetailsComponent.setCloseBtnClickHandler(this._onCloseBtnClick);

    this._filmDetailsComponent.setWatchlistBtnClickHandler(this._onWatchlistBtnClick);
    this._filmDetailsComponent.setWatchedBtnClickHandler(this._onWatchedBtnClick);
    this._filmDetailsComponent.setFavouriteBtnClickHandler(this._onFavouriteBtnClick);

    this._filmDetailsComponent.setEmojiClickHandler(this._onEmojiSelect);

    if (oldFilmDetailsComponent) {
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    }
    bodyElement.append(this._filmDetailsComponent.getElement());

    document.addEventListener(`keydown`, this._onEscapePress);
  }

  _onCloseBtnClick() {
    this.setDefaultView();
    document.removeEventListener(`keydown`, this._onEscapePress);
  }

  // ----------------------- Выбор эмоции -----------------------

  _onEmojiSelect(evt) {
    this._selectedEmojiPlacement = this._filmDetailsComponent.getEmojiPlacement();
    const emojiImageSrc = evt.target.matches(`img`) ? evt.target.src : evt.target.firstElementChild.src;

    const nameStartIndex = emojiImageSrc.lastIndexOf(`/`);
    const nameEndIndex = emojiImageSrc.lastIndexOf(`.`);
    const emojiName = emojiImageSrc.slice(nameStartIndex + 1, nameEndIndex);

    this._selectedEmojiPlacement.src = `./images/emoji/${emojiName}.png`;
    this._selectedEmojiPlacement.alt = `emoji-${emojiName}`;
  }

  // -----------------------------------------------------------

  _updateFilmData(key, value) {
    const oldFilmData = this._film;
    const newFilmData = Object.assign({}, this._film, {
      [key]: value
    });
    this._onDataChange(oldFilmData, newFilmData);
  }

  // ----------------------- К просмотру -----------------------

  _onWatchlistIconClick(evt) {
    evt.preventDefault();
    this._updateFilmData(MovieState.WATCHLIST, !this._film.isInWatchlist);
  }

  _onWatchlistBtnClick() {
    this._film.isInWatchlist = !this._film.isInWatchlist;
    this.render(this._film);
  }

  // ----------------------- Просмотрено -----------------------

  _onWatchedIconClick(evt) {
    evt.preventDefault();
    this._updateFilmData(MovieState.WATCHED, !this._film.isWatched);
  }

  _onWatchedBtnClick() {
    this._film.isWatched = !this._film.isWatched;
    this.render(this._film);
  }

  // ----------------------- Избранное -----------------------

  _onFavouriteIconClick(evt) {
    evt.preventDefault();
    this._updateFilmData(MovieState.FAVOURITE, !this._film.isFavourite);
  }

  _onFavouriteBtnClick() {
    this._film.isFavourite = !this._film.isFavourite;
    this.render(this._film);
  }
}
