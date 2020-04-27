import FilmsSection from '../components/films-section';
import FilmsList from '../components/films-list';
import FilmListHeading from '../components/films-list-heading';
import FilmsContainer from '../components/films-container';
import FilmCard from '../components/film-card';
import MoreBtn from '../components/more-btn';
import FilmsExtra from '../components/films-extra';
import FilmDetails from '../components/film-details';

import {RenderPosition, ExtraTitle, Key, START_INDEX} from '../const';
import {render, remove} from '../utils/render';

const SHOWN_FILMS_NUMBER_AT_START = 5;
const SHOWN_FILMS_NUMBER_BY_BTN = 5;

const NO_MOVIES_TEXT = `There are no movies in our database`;

let shownFilmsNumber = SHOWN_FILMS_NUMBER_AT_START;

const bodyElement = document.querySelector(`body`);

// =======================================================

const renderFilm = (filmsListContainer, film) => {
  const onPopupOpen = () => {
    bodyElement.append(filmDetailsElement);
    document.addEventListener(`keydown`, onEscapePress);
  };

  const onCloseBtnClick = () => {
    remove(filmDetailsElement);
    document.removeEventListener(`keydown`, onEscapePress);
  };

  const onEscapePress = (evt) => {
    if (evt.key === Key.ESCAPE) {
      remove(filmDetailsElement);
      document.removeEventListener(`keydown`, onEscapePress);
    }
  };

  const filmCard = new FilmCard(film);
  const filmDetails = new FilmDetails(film);
  const filmDetailsElement = filmDetails.getElement();

  filmCard.setElementClickHandler(onPopupOpen, `.film-card__poster`);
  filmCard.setElementClickHandler(onPopupOpen, `.film-card__title`);
  filmCard.setElementClickHandler(onPopupOpen, `.film-card__comments`);
  filmDetails.setCloseBtnClickHandler(onCloseBtnClick);

  render(filmsListContainer.getElement(), filmCard, RenderPosition.BEFOREEND);
};

const renderFilms = (filmsContainer, filmsList, fromIndex, toIndex) => {
  filmsList.slice(fromIndex, toIndex).forEach((film) => {
    renderFilm(filmsContainer, film);
  });
};

// =======================================================

export default class PageController {
  constructor(container, films, topRated, topCommented) {
    this._container = container;

    this._filmsContainerElement = new FilmsContainer();
    this._filmsListElement = new FilmsList();

    this._isEmpty = !films.length;
    this._isEmptyText = this._isEmpty ? NO_MOVIES_TEXT : undefined;
    this._filmListHeading = new FilmListHeading(!this._isEmpty, this._isEmptyText);

    this._filmsSectionElement = new FilmsSection(this._filmsListElement);

    this._filmsTopRatedElement = new FilmsExtra(ExtraTitle.TOP_RATED, topRated);
    this._filmsTopCommentedElement = new FilmsExtra(ExtraTitle.TOP_COMMENTED, topCommented);

    this._filmsTopRatedContainer = new FilmsContainer();
    this._filmsTopCommentedContainer = new FilmsContainer();

    this._moreBtnElement = new MoreBtn();
  }

  render(films, topRated, topCommented) {

    render(this._container, this._filmsSectionElement, RenderPosition.BEFOREEND);
    render(this._filmsSectionElement.getElement(), this._filmsListElement, RenderPosition.BEFOREEND);

    render(this._filmsListElement.getElement(), this._filmListHeading, RenderPosition.AFTERBEGIN);
    if (!films.length) {
      return;
    }

    renderFilms(this._filmsContainerElement, films, START_INDEX, SHOWN_FILMS_NUMBER_AT_START);
    render(this._filmsListElement.getElement(), this._filmsContainerElement, RenderPosition.BEFOREEND);

    render(this._filmsListElement.getElement(), this._moreBtnElement, RenderPosition.BEFOREEND);

    renderFilms(this._filmsTopRatedContainer, topRated, START_INDEX);
    renderFilms(this._filmsTopCommentedContainer, topCommented, START_INDEX);

    render(this._filmsTopRatedElement.getElement(), this._filmsTopRatedContainer, RenderPosition.BEFOREEND);
    render(this._filmsTopCommentedElement.getElement(), this._filmsTopCommentedContainer, RenderPosition.BEFOREEND);
    render(this._filmsSectionElement.getElement(), this._filmsTopRatedElement, RenderPosition.BEFOREEND);
    render(this._filmsSectionElement.getElement(), this._filmsTopCommentedElement, RenderPosition.BEFOREEND);

    // -----------------------------------

    this._moreBtnElement.setClickHandler(() => {
      const prevShownFilmsNumber = shownFilmsNumber;
      shownFilmsNumber += SHOWN_FILMS_NUMBER_BY_BTN;

      renderFilms(this._filmsContainerElement, films, prevShownFilmsNumber, shownFilmsNumber);

      if (shownFilmsNumber >= films.length) {
        remove(this._moreBtnElement.getElement());
      }
    });
  }
}
