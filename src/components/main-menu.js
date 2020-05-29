import AbstractComponent from './abstract-component';
import {getWatchlistMovies, getWatchedMovies, getFavouriteMovies} from '../utils/filter';
import {MoviesFilter, filterToNavItemName, MenuItem} from '../const';

const FILTER_HREF_PREFIX = `#`;
const ACTIVE_NAV_ITEM_CLASS = `main-navigation__item--active`;

const filmsCount = (name, count) => {
  return (name !== MoviesFilter.ALL) ?
    `<span class="main-navigation__item-count">${count}</span>`
    : ``;
};

const createNavItem = (filter) => {
  const {name, count, isActive} = filter;

  if (name === MenuItem.STATS) {
    return ``;
  }

  const activeClass = isActive ? ACTIVE_NAV_ITEM_CLASS : ``;
  const navItem = `${filterToNavItemName[name]} ${filmsCount(name, count)}`;
  return (
    `<a href="#${name}" class="main-navigation__item ${activeClass}"
    >${navItem}</a>`
  );
};

const createMainMenuTemplate = (films, movieFilters) => {
  const watchlistFilmsNumber = getWatchlistMovies(films).length;
  const watchedFilmsNumber = getWatchedMovies(films).length;
  const favouriteFilmsNumber = getFavouriteMovies(films).length;

  let activeStatsClass = ``;

  movieFilters.forEach((item) => {
    switch (item.name) {
      case MoviesFilter.ALL:
        item.count = films.length;
        break;
      case MoviesFilter.WATCHLIST:
        item.count = watchlistFilmsNumber;
        break;
      case MoviesFilter.HISTORY:
        item.count = watchedFilmsNumber;
        break;
      case MoviesFilter.FAVORITES:
        item.count = favouriteFilmsNumber;
        break;
      case MenuItem.STATS:
        activeStatsClass = item.isActive ? ACTIVE_NAV_ITEM_CLASS : ``;
        break;
      default:
        return;
    }
  });

  const navItems = movieFilters.map(createNavItem).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${navItems}
      </div>
      <a href="#stats" class="main-navigation__additional ${activeStatsClass}">Stats</a>
    </nav>`
  );
};

const getFilterNameByHref = (href) => {
  const index = href.indexOf(FILTER_HREF_PREFIX);
  return href.slice(index + 1);
};

export default class MainMenu extends AbstractComponent {
  constructor(films, filters) {
    super();
    this._films = films;
    this._filters = filters;
  }

  getTemplate() {
    return createMainMenuTemplate(this._films, this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (!evt.target.classList.contains(`main-navigation__item`) &&
          !evt.target.classList.contains(`main-navigation__item-count`) &&
          !evt.target.classList.contains(`main-navigation__additional`)) {
        return;
      }

      let target = evt.target.tagName === `A` ? evt.target : evt.target.closest(`a`);
      const filterName = getFilterNameByHref(target.href);

      handler(filterName);
    });
  }

  setStatsClickHandler(handler) {
    const statsButton = this.getElement().querySelector(`.main-navigation__additional`);
    statsButton.addEventListener(`click`, handler);
  }
}
