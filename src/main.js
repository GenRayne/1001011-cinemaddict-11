import {createUserSection} from './components/user-section';
import {createMainMenuTemplate} from './components/main-menu';
import {createSortTemplate} from './components/sort';
import {createFilmsSectionTemplate} from './components/films-section';
import {createFilmCardTemplate} from './components/film-card';
import {createMoreBtn} from './components/more-btn';
import {createFilmsExtraTemplate} from './components/films-extra';
import {createFooterStatsTemplate} from './components/footer-stats';
import {createFilmDetailsTemplate} from './components/film-details';

import {generateFilms} from './mock/film';

const FILMS_NUMBER = 27;
const EXTRA_FILMS_NUMBER = 2;

const SHOWN_FILMS_NUMBER_AT_START = 5;
const SHOWN_FILMS_NUMBER_BY_BTN = 5;

const films = generateFilms(FILMS_NUMBER);
const extraRatedFilms = generateFilms(EXTRA_FILMS_NUMBER);
const extraCommentedFilms = generateFilms(EXTRA_FILMS_NUMBER);

let shownFilmsNumber = SHOWN_FILMS_NUMBER_AT_START;

// =======================================================

const renderFilms = (fromIndex, toIndex) => {
  films.slice(fromIndex, toIndex).forEach((film) => {
    render(filmsCardsElement, createFilmCardTemplate(film), `beforeend`);
  });
};

const render = (container, component, place) => {
  container.insertAdjacentHTML(place, component);
};

// =======================================================

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createUserSection(), `beforeend`);
render(siteMainElement, createMainMenuTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsSectionTemplate(), `beforeend`);

const contentElement = document.querySelector(`.films`);
const filmsListElement = document.querySelector(`.films-list`);
const filmsCardsElement = document.querySelector(`.films-list .films-list__container`);

renderFilms(0, SHOWN_FILMS_NUMBER_AT_START);

render(filmsListElement, createMoreBtn(), `beforeend`);

render(contentElement, createFilmsExtraTemplate(`Top rated`, extraRatedFilms), `beforeend`);
render(contentElement, createFilmsExtraTemplate(`Top commented`, extraCommentedFilms), `beforeend`);

render(siteFooterElement, createFooterStatsTemplate(FILMS_NUMBER), `beforeend`);
render(siteFooterElement, createFilmDetailsTemplate(), `afterend`);

const moreBtn = filmsListElement.querySelector(`.films-list__show-more`);

// =======================================================

moreBtn.addEventListener(`click`, () => {
  const prevShownFilmsNumber = shownFilmsNumber;
  shownFilmsNumber += SHOWN_FILMS_NUMBER_BY_BTN;

  renderFilms(prevShownFilmsNumber, shownFilmsNumber);

  if (shownFilmsNumber >= films.length) {
    moreBtn.remove();
  }
});
