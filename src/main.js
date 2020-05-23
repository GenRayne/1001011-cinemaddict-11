import FooterStats from './components/footer-stats';
import FilterController from './controllers/filter';
import Movies from './models/movies';
import PageController from './controllers/page';
import UserSection from './components/user-section';

import {generateFilms} from './mock/film';
import {render} from './utils/render';
import {RenderPosition} from './const';

const FILMS_NUMBER = 17;

const films = generateFilms(FILMS_NUMBER);

// =======================================================

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// -------------------------------------------------------

const userSectionElement = new UserSection(films);
const footerStatsElement = new FooterStats(FILMS_NUMBER);

const moviesModel = new Movies();
moviesModel.setMovies(films);

const filterController = new FilterController(siteMainElement, moviesModel);
const filmSection = new PageController(siteMainElement, moviesModel);

const renderPage = () => {
  render(siteHeaderElement, userSectionElement, RenderPosition.BEFOREEND);

  filterController.render();
  filmSection.render();

  render(siteFooterElement, footerStatsElement, `beforeend`);
};

// =======================================================

renderPage();
