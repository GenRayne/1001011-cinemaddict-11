const navItemsNames = {
  'all': `All movies`,
  'watchlist': `Watchlist`,
  'history': `History`,
  'favorites': `Favorites`,
};

const createNavItem = (film) => {
  const {name, count, isActive} = film;

  return (
    `<a href="#${name}"
      class="
        main-navigation__item
        ${isActive ? `main-navigation__item--active` : ``}
      "
    >${navItemsNames[name]} ${
      name !== `all` ?
        `<span class="main-navigation__item-count">${count}</span></a>`
        : ``
    }`
  );
};

const createMainMenuTemplate = (films) => {
  const watchlistFilmsNumber = films.filter((film) => {
    return film.isInWatchlist;
  });

  const watchedFilmsNumber = films.filter((film) => {
    return film.isWatched;
  });

  const favouriteFilmsNumber = films.filter((film) => {
    return film.isFavourite;
  });

  const navItems = [
    {
      name: `all`,
      count: films.length,
      isActive: true,
    },
    {
      name: `watchlist`,
      count: watchlistFilmsNumber.length,
      isActive: false,
    },
    {
      name: `history`,
      count: watchedFilmsNumber.length,
      isActive: false,
    },
    {
      name: `favorites`,
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
