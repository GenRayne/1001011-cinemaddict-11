import FooterStats from './components/footer-stats';
import MainMenu from './components/main-menu';
import PageController from './controllers/page';
import UserSection from './components/user-section';

import {generateFilms} from './mock/film';
import {render} from './utils/render';
import {RenderPosition, START_INDEX} from './const';

const FILMS_NUMBER = 17;
const EXTRA_FILMS_NUMBER = 2;

const films = generateFilms(FILMS_NUMBER);

const topRated = films.slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(START_INDEX, EXTRA_FILMS_NUMBER);

const topCommented = films.slice()
  .sort((a, b) => b.comments.length - a.comments.length)
  .slice(START_INDEX, EXTRA_FILMS_NUMBER);

// =======================================================

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// -------------------------------------------------------

const userSectionElement = new UserSection(films);
const mainMenuElement = new MainMenu(films);
const footerStatsElement = new FooterStats(FILMS_NUMBER);

const filmSection = new PageController(siteMainElement, films, topRated, topCommented);

const renderPage = () => {
  render(siteHeaderElement, userSectionElement, RenderPosition.BEFOREEND);
  render(siteMainElement, mainMenuElement, RenderPosition.BEFOREEND);

  filmSection.render(films, topRated, topCommented);

  render(siteFooterElement, footerStatsElement, `beforeend`);
};

// =======================================================

renderPage();
