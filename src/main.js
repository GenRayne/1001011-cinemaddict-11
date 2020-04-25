import UserSection from './components/user-section';
import MainMenu from './components/main-menu';
import Sort from './components/sort';
import FilmsSection from './components/films-section';
import FilmsList from './components/films-list';
import FilmListHeading from './components/films-list-heading';
import FilmsContainer from './components/films-container';
import FilmCard from './components/film-card';
import MoreBtn from './components/more-btn';
import FilmsExtra from './components/films-extra';
import FooterStats from './components/footer-stats';
import FilmDetails from './components/film-details';

import {RenderPosition, ExtraTitle, Key} from './const';
import {render, remove} from './utils/render';
import {generateFilms} from './mock/film';

const START_INDEX = 0;

const FILMS_NUMBER = 27;
const EXTRA_FILMS_NUMBER = 2;

const SHOWN_FILMS_NUMBER_AT_START = 5;
const SHOWN_FILMS_NUMBER_BY_BTN = 5;

const NO_MOVIES_TEXT = `There are no movies in our database`;

const films = generateFilms(FILMS_NUMBER);

let shownFilmsNumber = SHOWN_FILMS_NUMBER_AT_START;

const topRated = films.slice().sort((a, b) => {
  return b.rating - a.rating;
}).slice(START_INDEX, EXTRA_FILMS_NUMBER);

const topCommented = films.slice().sort((a, b) => {
  return b.comments.length - a.comments.length;
})
.slice(START_INDEX, EXTRA_FILMS_NUMBER);

// =======================================================

const userSectionElement = new UserSection(films);
const mainMenuElement = new MainMenu(films);
const sortElement = new Sort();

const filmsContainerElement = new FilmsContainer();
const filmsListElement = new FilmsList();

const isEmpty = !films.length;
const isEmptyText = isEmpty ? NO_MOVIES_TEXT : undefined;
const filmListHeading = new FilmListHeading(!isEmpty, isEmptyText);

const filmsSectionElement = new FilmsSection(filmsListElement);

const filmsTopRatedElement = new FilmsExtra(ExtraTitle.TOP_RATED, topRated);
const filmsTopCommentedElement = new FilmsExtra(ExtraTitle.TOP_COMMENTED, topCommented);

const filmsTopRatedContainer = new FilmsContainer();
const filmsTopCommentedContainer = new FilmsContainer();

const moreBtnElement = new MoreBtn();
const footerStatsElement = new FooterStats(FILMS_NUMBER);

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

const renderFilmSection = () => {
  render(siteMainElement, filmsSectionElement, RenderPosition.BEFOREEND);
  render(filmsSectionElement.getElement(), filmsListElement, RenderPosition.BEFOREEND);

  render(filmsListElement.getElement(), filmListHeading, RenderPosition.AFTERBEGIN);
  if (!films.length) {
    return;
  }

  renderFilms(filmsContainerElement, films, START_INDEX, SHOWN_FILMS_NUMBER_AT_START);
  render(filmsListElement.getElement(), filmsContainerElement, RenderPosition.BEFOREEND);

  render(filmsListElement.getElement(), moreBtnElement, RenderPosition.BEFOREEND);

  renderFilms(filmsTopRatedContainer, topRated, START_INDEX);
  renderFilms(filmsTopCommentedContainer, topCommented, START_INDEX);

  render(filmsTopRatedElement.getElement(), filmsTopRatedContainer, RenderPosition.BEFOREEND);
  render(filmsTopCommentedElement.getElement(), filmsTopCommentedContainer, RenderPosition.BEFOREEND);
  render(filmsSectionElement.getElement(), filmsTopRatedElement, RenderPosition.BEFOREEND);
  render(filmsSectionElement.getElement(), filmsTopCommentedElement, RenderPosition.BEFOREEND);
};

const renderPage = () => {
  render(siteHeaderElement, userSectionElement, RenderPosition.BEFOREEND);
  render(siteMainElement, mainMenuElement, RenderPosition.BEFOREEND);
  render(siteMainElement, sortElement, RenderPosition.BEFOREEND);

  renderFilmSection();

  render(siteFooterElement, footerStatsElement, `beforeend`);
};

// =======================================================

const bodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

renderPage();

// =======================================================

moreBtnElement.setClickHandler(() => {
  const prevShownFilmsNumber = shownFilmsNumber;
  shownFilmsNumber += SHOWN_FILMS_NUMBER_BY_BTN;

  renderFilms(filmsContainerElement, films, prevShownFilmsNumber, shownFilmsNumber);

  if (shownFilmsNumber >= films.length) {
    remove(moreBtnElement.getElement());
  }
});
