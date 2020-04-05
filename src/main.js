import {createUserSection} from './components/user-section';
import {createMainMenuTemplate} from './components/main-menu';
import {createSortTemplate} from './components/sort';
import {createFilmsSectionTemplate} from './components/films-section';
import {createFilmCardTemplate} from './components/film-card';
import {createMoreBtn} from './components/more-btn';
import {createFilmsExtraTemplate} from './components/films-extra';
import {createFooterStatsTemplate} from './components/footer-stats';
import {createFilmDetailsTemplate} from './components/film-details';

const FILMS_NUMBER = 5;

const render = (container, component, place) => {
  container.insertAdjacentHTML(place, component);
};

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

for (let i = 0; i < FILMS_NUMBER; i++) {
  render(filmsCardsElement, createFilmCardTemplate(), `beforeend`);
}

render(filmsListElement, createMoreBtn(), `beforeend`);

render(contentElement, createFilmsExtraTemplate(`Top rated`), `beforeend`);
render(contentElement, createFilmsExtraTemplate(`Top commented`), `beforeend`);

render(siteFooterElement, createFooterStatsTemplate(), `beforeend`);
render(siteFooterElement, createFilmDetailsTemplate(), `afterend`);
