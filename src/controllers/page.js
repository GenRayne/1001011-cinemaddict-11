import FilmsSection from '../components/films-section';
import FilmsList from '../components/films-list';
import FilmListHeading from '../components/films-list-heading';
import FilmsContainer from '../components/films-container';
import FilmsExtra from '../components/films-extra';
import MoreBtn from '../components/more-btn';
import MovieController from '../controllers/movie';
import Sort, {SortType} from '../components/sort';

import {RenderPosition, ExtraTitle, START_INDEX} from '../const';
import {render, remove} from '../utils/render';

const SHOWN_FILMS_NUMBER_AT_START = 5;
const SHOWN_FILMS_NUMBER_BY_BTN = 5;

const NO_MOVIES_TEXT = `There are no movies in our database`;

const siteMainElement = document.querySelector(`.main`);

// =============================================================

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const shownFilms = films.slice();

  switch (sortType) {
    case SortType.DEFAULT:
      sortedFilms = shownFilms;
      break;
    case SortType.DATE:
      sortedFilms = shownFilms.sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case SortType.RATING:
      sortedFilms = shownFilms.sort((a, b) => b.rating - a.rating);
      break;
  }

  return sortedFilms.slice(from, to);
};

const renderFilms = (filmsContainer, filmsList, onDataChange, onViewChange) => {
  return filmsList.map((film) => {
    const movieController = new MovieController(filmsContainer, onDataChange, onViewChange);
    movieController.render(film);

    return movieController;
  });
};

// =============================================================

export default class PageController {
  constructor(container, films, topRated, topCommented, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._shownFilmsNumber = SHOWN_FILMS_NUMBER_AT_START;

    this._shownMovieControllers = [];
    this._shownTopRatedMovieControllers = [];
    this._shownTopCommentedMovieControllers = [];

    this._filmsContainer = new FilmsContainer();
    this._filmsList = new FilmsList();

    this._isEmpty = !films.length;
    this._isEmptyText = this._isEmpty ? NO_MOVIES_TEXT : undefined;
    this._filmListHeading = new FilmListHeading(!this._isEmpty, this._isEmptyText);

    this._sort = new Sort();
    this._filmsSection = new FilmsSection(this._filmsList);

    this._filmsTopRated = new FilmsExtra(ExtraTitle.TOP_RATED, topRated);
    this._filmsTopCommented = new FilmsExtra(ExtraTitle.TOP_COMMENTED, topCommented);

    this._filmsTopRatedContainer = new FilmsContainer();
    this._filmsTopCommentedContainer = new FilmsContainer();

    this._moreBtnElement = new MoreBtn();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._moreButtonClickHandler = this._moreButtonClickHandler.bind(this);

    this._sort.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  // --------------------------------------------------------------

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onViewChange() {
    this._shownMovieControllers.forEach((item) => {
      item._onViewChange();
    });
  }

  // --------------------------------------------------------------

  _onSortTypeChange(sortType) {
    const movies = this._moviesModel.getMovies();
    this._shownFilmsNumber = SHOWN_FILMS_NUMBER_AT_START;

    const sortedFilms = getSortedFilms(movies, sortType, 0, this._shownFilmsNumber);

    this._filmsContainer.getElement().innerHTML = ``;

    const newFilms = renderFilms(
        this._filmsContainer.getElement(),
        sortedFilms,
        this._onDataChange,
        this._onViewChange
    );

    this._shownMovieControllers = newFilms;

    this._renderLoadMoreBtn();
  }

  // --------------------------------------------------------------

  _moreButtonClickHandler() {
    const movies = this._moviesModel.getMovies();

    const prevShownFilmsNumber = this._shownFilmsNumber;
    this._shownFilmsNumber += SHOWN_FILMS_NUMBER_BY_BTN;

    const sortedFilms = getSortedFilms(
        movies,
        this._sort.getSortType(),
        prevShownFilmsNumber,
        this._shownFilmsNumber
    );
    const moreFilms = renderFilms(
        this._filmsContainer.getElement(),
        sortedFilms,
        this._onDataChange,
        this._onViewChange
    );
    this._shownMovieControllers = this._shownMovieControllers.concat(moreFilms);

    if (this._shownFilmsNumber >= movies.length) {
      remove(this._moreBtnElement.getElement());
    }
  }

  _renderLoadMoreBtn() {
    if (this._shownFilmsNumber >= this._moviesModel.getMovies().length) {
      return;
    }
    render(this._filmsList.getElement(), this._moreBtnElement, RenderPosition.BEFOREEND);

    this._moreBtnElement.setClickHandler(this._moreButtonClickHandler);
  }

  // --------------------------------------------------------------

  render(films, topRated, topCommented) {
    const movies = this._moviesModel.getMovies();

    render(siteMainElement, this._sort, RenderPosition.BEFOREEND);
    render(this._container, this._filmsSection, RenderPosition.BEFOREEND);
    render(this._filmsSection.getElement(), this._filmsList, RenderPosition.BEFOREEND);

    render(this._filmsList.getElement(), this._filmListHeading, RenderPosition.AFTERBEGIN);
    if (!movies.length) {
      return;
    }

    const newFilms = renderFilms(
        this._filmsContainer.getElement(),
        movies.slice(START_INDEX, SHOWN_FILMS_NUMBER_AT_START),
        this._onDataChange,
        this._onViewChange
    );

    this._shownMovieControllers = this._shownMovieControllers.concat(newFilms);
    this._shownFilmsNumber = this._shownMovieControllers.length;

    render(this._filmsList.getElement(), this._filmsContainer, RenderPosition.BEFOREEND);

    this._renderLoadMoreBtn();

    this._shownTopRatedMovieControllers = renderFilms(
        this._filmsTopRatedContainer.getElement(),
        topRated,
        this._onDataChange,
        this._onViewChange
    );

    this._shownTopCommentedMovieControllers = renderFilms(
        this._filmsTopCommentedContainer.getElement(),
        topCommented,
        this._onDataChange,
        this._onViewChange
    );

    render(this._filmsTopRated.getElement(), this._filmsTopRatedContainer, RenderPosition.BEFOREEND);
    render(this._filmsTopCommented.getElement(), this._filmsTopCommentedContainer, RenderPosition.BEFOREEND);
    render(this._filmsSection.getElement(), this._filmsTopRated, RenderPosition.BEFOREEND);
    render(this._filmsSection.getElement(), this._filmsTopCommented, RenderPosition.BEFOREEND);
  }
}
