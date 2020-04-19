import {MoviesFilter, filterToNavItemName} from '../const';
import {createElement} from '../utils';

const filmsCount = (name, count) => {
  return (name !== MoviesFilter.ALL) ?
    `<span class="main-navigation__item-count">${count}</span>`
    : ``;
};

const createNavItem = (film) => {
  const {name, count, isActive} = film;

  const activeClass = isActive ? `main-navigation__item--active` : ``;
  const navItem = `${filterToNavItemName[name]} ${filmsCount(name, count)}`;

  return (
    `<a href="#${name}" class="main-navigation__item ${activeClass}"
    >${navItem}</a>`
  );
};

const createMainMenuTemplate = (films) => {
  const watchlistFilmsNumber = films.filter((film) => film.isInWatchlist);
  const watchedFilmsNumber = films.filter((film) => film.isWatched);
  const favouriteFilmsNumber = films.filter((film) => film.isFavourite);

  const navItems = [
    {
      name: MoviesFilter.ALL,
      count: films.length,
      isActive: true,
    },
    {
      name: MoviesFilter.WATCHLIST,
      count: watchlistFilmsNumber.length,
      isActive: false,
    },
    {
      name: MoviesFilter.HISTORY,
      count: watchedFilmsNumber.length,
      isActive: false,
    },
    {
      name: MoviesFilter.FAVORITES,
      count: favouriteFilmsNumber.length,
      isActive: false,
    },
  ]
  .map(createNavItem)
  .join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${navItems}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainMenu {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createMainMenuTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
