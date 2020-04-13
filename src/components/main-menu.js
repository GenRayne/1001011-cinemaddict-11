import {MovieList, navItemsNames} from '../const';

const createNavItem = (film) => {
  const {name, count, isActive} = film;

  return (
    `<a href="#${name}"
      class="
        main-navigation__item
        ${isActive ? `main-navigation__item--active` : ``}
      "
    >${navItemsNames[name]} ${
      name !== MovieList.ALL ?
        `<span class="main-navigation__item-count">${count}</span></a>`
        : ``
    }`
  );
};

const createMainMenuTemplate = (films) => {
  const watchlistFilmsNumber = films.filter((film) => film.isInWatchlist);
  const watchedFilmsNumber = films.filter((film) => film.isWatched);
  const favouriteFilmsNumber = films.filter((film) => film.isFavourite);

  const navItems = [
    {
      name: MovieList.ALL,
      count: films.length,
      isActive: true,
    },
    {
      name: MovieList.WATCHLIST,
      count: watchlistFilmsNumber.length,
      isActive: false,
    },
    {
      name: MovieList.HISTORY,
      count: watchedFilmsNumber.length,
      isActive: false,
    },
    {
      name: MovieList.FAVORITES,
      count: favouriteFilmsNumber.length,
      isActive: false,
    },
  ];

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${navItems.map(createNavItem).join(`\n`)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export {createMainMenuTemplate};
