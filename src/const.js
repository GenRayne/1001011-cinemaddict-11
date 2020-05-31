export const INPUT_ERROR_SHADOW = `inset 0 0 5px 0 red`;

export const HIDDEN_CLASS = `visually-hidden`;

export const START_INDEX = 0;

export const SHAKE_TIMEOUT = 600;

export const MINUTES_IN_HOUR = 60;

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
  GET_TEMPLATE_NOT_IMPLEMENTED: `Abstract method should be implemented: getTemplate.`
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

export const MenuItem = Object.assign(MoviesFilter, {STATS: `stats`});

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

export const TimePeriod = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};

export const timePeriodToItemName = {
  [TimePeriod.ALL]: `All time`,
  [TimePeriod.TODAY]: `Today`,
  [TimePeriod.WEEK]: `Week`,
  [TimePeriod.MONTH]: `Month`,
  [TimePeriod.YEAR]: `Year`,
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
