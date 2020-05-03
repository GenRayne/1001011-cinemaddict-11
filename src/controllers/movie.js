import {RenderPosition, Key} from '../const';
import {render, remove, replace} from '../utils/render';
import FilmCard from '../components/film-card';
import FilmDetails from '../components/film-details';

const Mode = {
  DEFAULT: `default`,
  DETAILED: `detailed`
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
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._film = film;
    this._filmComponent = new FilmCard(this._film);
    this._filmDetailsComponent = new FilmDetails(this._film);

    this._filmComponent.setElementClickHandler(this._onPopupOpen, `.film-card__poster`);
    this._filmComponent.setElementClickHandler(this._onPopupOpen, `.film-card__title`);
    this._filmComponent.setElementClickHandler(this._onPopupOpen, `.film-card__comments`);
    this._filmDetailsComponent.setCloseBtnClickHandler(this._onCloseBtnClick);

    this._filmComponent.setWatchlistIconClickHandler(this._onWatchlistIconClick);
    this._filmComponent.setWatchedIconClickHandler(this._onWatchedIconClick);
    this._filmComponent.setFavouriteIconClickHandler(this._onFavouriteIconClick);

    this._filmDetailsComponent.setWatchlistBtnClickHandler(this._onWatchlistBtnClick);
    this._filmDetailsComponent.setWatchedBtnClickHandler(this._onWatchedBtnClick);
    this._filmDetailsComponent.setFavouriteBtnClickHandler(this._onFavouriteBtnClick);

    this._filmDetailsComponent.setEmojiClickHandler(this._onEmojiSelect);

    if (oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
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
    bodyElement.append(this._filmDetailsComponent.getElement());
    document.addEventListener(`keydown`, this._onEscapePress);
    this._mode = Mode.DETAILED;
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

  // ----------------------- К просмотру -----------------------

  _onWatchlistIconClick(evt) {
    evt.preventDefault();
    const oldFilmData = this._film;
    const newFilmData = Object.assign({}, this._film, {
      isInWatchlist: !this._film.isInWatchlist
    });
    this._onDataChange(oldFilmData, newFilmData);
  }

  _onWatchlistBtnClick() {
    this._film.isInWatchlist = !this._film.isInWatchlist;
  }

  // ----------------------- Просмотрено -----------------------

  _onWatchedIconClick(evt) {
    evt.preventDefault();
    const oldFilmData = this._film;
    const newFilmData = Object.assign({}, this._film, {
      isWatched: !this._film.isWatched
    });
    this._onDataChange(oldFilmData, newFilmData);
  }

  _onWatchedBtnClick() {
    this._film.isWatched = !this._film.isWatched;
  }

  // ----------------------- Избранное -----------------------

  _onFavouriteIconClick(evt) {
    evt.preventDefault();
    const oldFilmData = this._film;
    const newFilmData = Object.assign({}, this._film, {
      isFavourite: !this._film.isFavourite
    });
    this._onDataChange(oldFilmData, newFilmData);
  }

  _onFavouriteBtnClick() {
    this._film.isFavourite = !this._film.isFavourite;
  }
}
