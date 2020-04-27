import UserSection from './components/user-section';
import MainMenu from './components/main-menu';
import Sort from './components/sort';
import FooterStats from './components/footer-stats';
import PageController from './controllers/page-controller';

import {RenderPosition, START_INDEX} from './const';
import {render} from './utils/render';
import {generateFilms} from './mock/film';

const FILMS_NUMBER = 27;
const EXTRA_FILMS_NUMBER = 2;

const films = generateFilms(FILMS_NUMBER);

const topRated = films.slice().sort((a, b) => {
  return b.rating - a.rating;
}).slice(START_INDEX, EXTRA_FILMS_NUMBER);

const topCommented = films.slice().sort((a, b) => {
  return b.comments.length - a.comments.length;
})
.slice(START_INDEX, EXTRA_FILMS_NUMBER);

// =======================================================

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// -------------------------------------------------------

const userSectionElement = new UserSection(films);
const mainMenuElement = new MainMenu(films);
const sortElement = new Sort();
const footerStatsElement = new FooterStats(FILMS_NUMBER);

const filmSection = new PageController(siteMainElement, films, topRated, topCommented);

const renderPage = () => {
  render(siteHeaderElement, userSectionElement, RenderPosition.BEFOREEND);
  render(siteMainElement, mainMenuElement, RenderPosition.BEFOREEND);
  render(siteMainElement, sortElement, RenderPosition.BEFOREEND);

  filmSection.render(films, topRated, topCommented);

  render(siteFooterElement, footerStatsElement, `beforeend`);
};

// =======================================================

renderPage();
