import {RenderPosition, Key} from '../const';
import {render, remove, replace} from '../utils/render';
import FilmCard from '../components/film-card';
import FilmDetails from '../components/film-details';

const bodyElement = document.querySelector(`body`);

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._onEscapePress = this._onEscapePress.bind(this);
    this._onPopupOpen = this._onPopupOpen.bind(this);
    this._onCloseBtnClick = this._onCloseBtnClick.bind(this);

    this._onWatchlistIconClick = this._onWatchlistIconClick.bind(this);
    this._onWatchedIconClick = this._onWatchedIconClick.bind(this);
    this._onFavouriteIconClick = this._onFavouriteIconClick.bind(this);
  }

  render(film) {
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

    render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
  }

  replace(newFilmData) {
    const newFilmComponent = new FilmCard(newFilmData);
    replace(newFilmComponent, this._filmComponent);
  }

  _onEscapePress(evt) {
    if (evt.key === Key.ESCAPE) {
      remove(this._filmDetailsComponent.getElement());
      document.removeEventListener(`keydown`, this._onEscapePress);
    }
  }

  _onPopupOpen() {
    bodyElement.append(this._filmDetailsComponent.getElement());
    document.addEventListener(`keydown`, this._onEscapePress);
  }

  _onCloseBtnClick() {
    remove(this._filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, this._onEscapePress);
  }

  _onWatchlistIconClick(evt) {
    evt.preventDefault();
    const oldFilmData = this._film;
    const newFilmData = Object.assign({}, this._film, {
      isInWatchlist: !this._film.isInWatchlist
    });
    this._onDataChange(oldFilmData, newFilmData);
  }

  _onWatchedIconClick(evt) {
    evt.preventDefault();
    const oldFilmData = this._film;
    const newFilmData = Object.assign({}, this._film, {
      isWatched: !this._film.isWatched
    });
    this._onDataChange(oldFilmData, newFilmData);
  }

  _onFavouriteIconClick(evt) {
    evt.preventDefault();
    const oldFilmData = this._film;
    const newFilmData = Object.assign({}, this._film, {
      isFavourite: !this._film.isFavourite
    });
    this._onDataChange(oldFilmData, newFilmData);
  }
}
