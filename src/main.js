import FooterStats from './components/footer-stats';
import FilterController from './controllers/filter';
import PageController from './controllers/page';
import UserSection from './components/user-section';
import Movies from './models/movies';

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
const footerStatsElement = new FooterStats(FILMS_NUMBER);

const moviesModel = new Movies();
moviesModel.setMovies(films);

const topRatedMoviesModel = new Movies();
topRatedMoviesModel.setMovies(topRated);

const topCommentedMoviesModel = new Movies();
topCommentedMoviesModel.setMovies(topCommented);

const filterController = new FilterController(siteMainElement, moviesModel);
const filmSection = new PageController(siteMainElement, moviesModel, topRatedMoviesModel, topCommentedMoviesModel);

const renderPage = () => {
  render(siteHeaderElement, userSectionElement, RenderPosition.BEFOREEND);

  filterController.render();
  filmSection.render();

  render(siteFooterElement, footerStatsElement, `beforeend`);
};

// =======================================================

renderPage();
