import API from './api/index';
import Provider from './api/provider';
import Store from './api/store';
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

const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

// =======================================================

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// -------------------------------------------------------

const userSectionElement = new UserSection([]);
const moviesModel = new Movies();

const filterController = new FilterController(siteMainElement, moviesModel);
const filmSection = new PageController(siteMainElement, moviesModel, apiWithProvider);

const footerStats = new FooterStats(NO_MOVIES);

// =======================================================

moviesModel.setMovies([]);

render(siteHeaderElement, userSectionElement, RenderPosition.BEFOREEND);

filterController.render();
filmSection.render(LoadingText.DEFAULT);

render(siteFooterElement, footerStats, RenderPosition.BEFOREEND);

// =======================================================

apiWithProvider.getMovies()
.then((movies) => {
  moviesModel.setMovies(movies);
  filmSection.render();

  const newFooterStats = new FooterStats(movies.length);
  remove(footerStats.getElement());
  render(siteFooterElement, newFooterStats, RenderPosition.BEFOREEND);

  filterController.render(filmSection);
})
.catch(() => {
  moviesModel.setMovies([]);
  filmSection.render();
});
