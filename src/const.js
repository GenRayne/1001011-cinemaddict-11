export const START_INDEX = 0;

export const INPUT_ERROR_SHADOW = `inset 0 0 5px 0 red`;

export const SHAKE_TIMEOUT = 600;

export const DeletingText = {
  DEFAULT: `Delete`,
  LOADING: `Deleting...`,
};

export const LoadingText = {
  DEFAULT: `Loading...`,
  COMMENTS_ERROR: `Couldn't load the comments, try again later :(`,
};

export const AbstractComponentError = {
  NEW: `A new component can't be an instance of AbstractComponent. Use 'extends' instead.`,
  // Метод ниже в CamelCase, т.к. иначе при вызове ошибка линтера:
  // "A function with a name starting with an uppercase letter should only be used as a constructor".
  methodNotImplemented: (methodName) => `Abstract method should be implemented: ${methodName}.`
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const Key = {
  ESCAPE: `Escape`,
  ENTER: `Enter`,
};

export const MoviesFilter = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export const ExtraTitle = {
  TOP_RATED: `Top rated`,
  TOP_COMMENTED: `Top commented`,
};

export const UserRating = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
};

export const RatingStep = {
  FIRST: 10,
  SECOND: 20,
};

export const filterToNavItemName = {
  [MoviesFilter.ALL]: `All movies`,
  [MoviesFilter.WATCHLIST]: `Watchlist`,
  [MoviesFilter.HISTORY]: `History`,
  [MoviesFilter.FAVORITES]: `Favorites`,
};

export const EMOJIS = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];
