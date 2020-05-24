import API from './api';
import FilterController from './controllers/filter';
import FooterStats from './components/footer-stats';
import Movies from './models/movies';
import PageController from './controllers/page';
import UserSection from './components/user-section';

import {render, remove} from './utils/render';
import {RenderPosition, LoadingText} from './const';

const NO_MOVIES = 0;

const AUTHORIZATION = `Basic fFaDKd395hd8gaHh57`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);

// =======================================================

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// -------------------------------------------------------

const userSectionElement = new UserSection([]);
const moviesModel = new Movies();

const filterController = new FilterController(siteMainElement, moviesModel);
const filmSection = new PageController(siteMainElement, moviesModel, api);

const footerStats = new FooterStats(NO_MOVIES);

// =======================================================

moviesModel.setMovies([]);

render(siteHeaderElement, userSectionElement, RenderPosition.BEFOREEND);

filterController.render();
filmSection.render(LoadingText.DEFAULT);

render(siteFooterElement, footerStats, RenderPosition.BEFOREEND);

// =======================================================

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
    filmSection.render();

    const newFooterStats = new FooterStats(movies.length);
    remove(footerStats.getElement());
    render(siteFooterElement, newFooterStats, RenderPosition.BEFOREEND);
  })
  .catch(() => {
    moviesModel.setMovies([]);
    filmSection.render();
  });
