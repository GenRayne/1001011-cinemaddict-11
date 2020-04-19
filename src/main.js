import UserSection from './components/user-section';
import MainMenu from './components/main-menu';
import Sort from './components/sort';
import FilmsSection from './components/films-section';
import FilmsList from './components/films-list';
import FilmsContainer from './components/films-container';
import FilmCard from './components/film-card';
import MoreBtn from './components/more-btn';
import FilmsExtra from './components/films-extra';
import FooterStats from './components/footer-stats';
// import FilmDetails from './components/film-details';

import {RenderPosition, ExtraTitle} from './const';
import {render} from './utils';
import {generateFilms} from './mock/film';

const FILMS_NUMBER = 27;
const EXTRA_FILMS_NUMBER = 2;

const SHOWN_FILMS_NUMBER_AT_START = 5;
const SHOWN_FILMS_NUMBER_BY_BTN = 5;

const films = generateFilms(FILMS_NUMBER);

let shownFilmsNumber = SHOWN_FILMS_NUMBER_AT_START;

const topRated = films.slice().sort((a, b) => {
  return b.rating - a.rating;
}).slice(0, EXTRA_FILMS_NUMBER);

const topCommented = films.slice().sort((a, b) => {
  return b.comments.length - a.comments.length;
})
.slice(0, EXTRA_FILMS_NUMBER);

// =======================================================

const userSectionElement = new UserSection(films).getElement();
const mainMenuElement = new MainMenu(films).getElement();
const sortElement = new Sort().getElement();

const filmsContainerElement = new FilmsContainer().getElement();
const filmsListElement = new FilmsList(filmsContainerElement).getElement();
const filmsSectionElement = new FilmsSection(filmsListElement).getElement();

const filmsTopRatedElement = new FilmsExtra(ExtraTitle.TOP_RATED, topRated).getElement();
const filmsTopCommentedElement = new FilmsExtra(ExtraTitle.TOP_COMMENTED, topCommented).getElement();

const moreBtnElement = new MoreBtn().getElement();

// =======================================================

const renderFilm = (filmsListContainer, film) => {
  const filmComponent = new FilmCard(film);

  render(filmsListContainer, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilms = (filmsContainer, filmsList, fromIndex, toIndex) => {
  filmsList.slice(fromIndex, toIndex).forEach((film) => {
    renderFilm(filmsContainer, film);
  });
};

const renderPage = () => {
  render(siteHeaderElement, userSectionElement, RenderPosition.BEFOREEND);
  render(siteMainElement, mainMenuElement, RenderPosition.BEFOREEND);
  render(siteMainElement, sortElement, RenderPosition.BEFOREEND);
  render(siteMainElement, filmsSectionElement, RenderPosition.BEFOREEND);

  renderFilms(filmsContainerElement, films, 0, SHOWN_FILMS_NUMBER_AT_START);
  render(filmsListElement, filmsContainerElement, RenderPosition.BEFOREEND);
  render(filmsSectionElement, filmsListElement, RenderPosition.BEFOREEND);

  render(filmsSectionElement, filmsTopRatedElement, RenderPosition.BEFOREEND);
  render(filmsSectionElement, filmsTopCommentedElement, RenderPosition.BEFOREEND);

  render(filmsListElement, moreBtnElement, RenderPosition.BEFOREEND);
};

// =======================================================

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

renderPage();

render(siteFooterElement, new FooterStats(FILMS_NUMBER).getElement(), `beforeend`);
// render(siteFooterElement, new FilmDetails(films[0]).getElement(), `afterend`);

// =======================================================

moreBtnElement.addEventListener(`click`, () => {
  const prevShownFilmsNumber = shownFilmsNumber;
  shownFilmsNumber += SHOWN_FILMS_NUMBER_BY_BTN;

  renderFilms(filmsContainerElement, films, prevShownFilmsNumber, shownFilmsNumber);

  if (shownFilmsNumber >= films.length) {
    moreBtnElement.remove();
  }
});
