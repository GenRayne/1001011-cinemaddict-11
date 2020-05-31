import Comments from '../models/comments';
import FilmListHeading from '../components/films-list-heading';
import FilmsContainer from '../components/films-container';
import FilmsExtra from '../components/films-extra';
import FilmsList from '../components/films-list';
import FilmsSection from '../components/films-section';
import MoreBtn from '../components/more-btn';
import MovieController from '../controllers/movie';
import Sort, {SortType} from '../components/sort';

import {getTopRated, getTopCommented} from '../utils/common';
import {ExtraTitle, RenderPosition, START_INDEX} from '../const';
import {render, remove, replace} from '../utils/render';

const SHOWN_FILMS_NUMBER_AT_START = 5;
const SHOWN_FILMS_NUMBER_BY_BTN = 5;
const EXTRA_FILMS_NUMBER = 2;

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

const renderFilms = (filmsContainer, filmsList, api, onDataChange, onViewChange) => {
  return filmsList.map((film) => {
    const commentsModel = new Comments();
    commentsModel.setComments(film.comments);
    const movieController = new MovieController(filmsContainer, commentsModel, api, onDataChange, onViewChange);
    movieController.render(film);

    return movieController;
  });
};

// =============================================================

export default class PageController {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;

    const movies = this._moviesModel.getMovies();
    const topRated = getTopRated(movies, EXTRA_FILMS_NUMBER);
    const topCommented = getTopCommented(movies, EXTRA_FILMS_NUMBER);

    this._shownFilmsNumber = SHOWN_FILMS_NUMBER_AT_START;

    this._shownMovieControllers = [];
    this._shownTopRatedMovieControllers = [];
    this._shownTopCommentedMovieControllers = [];

    this._filmsContainer = new FilmsContainer();
    this._filmsList = new FilmsList();

    this._sort = new Sort();
    this._filmsSection = new FilmsSection(this._filmsList);

    this._filmsTopRated = new FilmsExtra(ExtraTitle.TOP_RATED, topRated);
    this._filmsTopCommented = new FilmsExtra(ExtraTitle.TOP_COMMENTED, topCommented);

    this._filmsTopRatedContainer = new FilmsContainer();
    this._filmsTopCommentedContainer = new FilmsContainer();

    this._moreBtnElement = new MoreBtn();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._moreButtonClickHandler = this._moreButtonClickHandler.bind(this);

    this._sort.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  // --------------------------------------------------------------

  _renderMovies(movies) {
    const moviesContainer = this._filmsContainer.getElement();

    const newMovies = renderFilms(
        moviesContainer,
        movies,
        this._api,
        this._onDataChange,
        this._onViewChange
    );

    this._shownMovieControllers = this._shownMovieControllers.concat(newMovies);
    this._shownFilmsNumber = this._shownMovieControllers.length;
  }

  _renderExtras(topRated, topCommented) {
    this._shownTopRatedMovieControllers = renderFilms(
        this._filmsTopRatedContainer.getElement(),
        topRated,
        this._api,
        this._onDataChange,
        this._onViewChange
    );

    this._shownTopCommentedMovieControllers = renderFilms(
        this._filmsTopCommentedContainer.getElement(),
        topCommented,
        this._api,
        this._onDataChange,
        this._onViewChange
    );
  }

  _removeMovies() {
    this._shownMovieControllers.forEach((controller) => controller.destroy());
    this._shownMovieControllers = [];
  }

  _updateMovies(count) {
    this._removeMovies();
    this._renderMovies(this._moviesModel.getMovies().slice(START_INDEX, count));
    this._renderLoadMoreBtn();
  }

  // --------------------------------------------------------------

  render(heading) {
    const movies = this._moviesModel.getMovies();
    const topRated = getTopRated(movies, EXTRA_FILMS_NUMBER);
    const topCommented = getTopCommented(movies, EXTRA_FILMS_NUMBER);

    render(siteMainElement, this._sort, RenderPosition.BEFOREEND);
    render(this._container, this._filmsSection, RenderPosition.BEFOREEND);
    render(this._filmsSection.getElement(), this._filmsList, RenderPosition.BEFOREEND);

    const isEmpty = !movies.length;

    if (heading) {
      this._filmListHeading = new FilmListHeading(!isEmpty, heading);
    } else {
      remove(this._filmListHeading.getElement());
      const isEmptyText = isEmpty ? NO_MOVIES_TEXT : undefined;
      this._filmListHeading = new FilmListHeading(!isEmpty, isEmptyText);
    }

    render(this._filmsList.getElement(), this._filmListHeading, RenderPosition.AFTERBEGIN);

    if (!movies.length) {
      return;
    }

    const newFilms = renderFilms(
        this._filmsContainer.getElement(),
        movies.slice(START_INDEX, SHOWN_FILMS_NUMBER_AT_START),
        this._api,
        this._onDataChange,
        this._onViewChange
    );

    this._shownMovieControllers = this._shownMovieControllers.concat(newFilms);
    this._shownFilmsNumber = this._shownMovieControllers.length;

    render(this._filmsList.getElement(), this._filmsContainer, RenderPosition.BEFOREEND);

    this._renderLoadMoreBtn();

    this._renderExtras(topRated, topCommented);

    if (topRated.length) {
      render(this._filmsTopRated.getElement(), this._filmsTopRatedContainer, RenderPosition.BEFOREEND);
      render(this._filmsSection.getElement(), this._filmsTopRated, RenderPosition.BEFOREEND);
    }
    if (topCommented.length) {
      render(this._filmsTopCommented.getElement(), this._filmsTopCommentedContainer, RenderPosition.BEFOREEND);
      render(this._filmsSection.getElement(), this._filmsTopCommented, RenderPosition.BEFOREEND);
    }
  }

  // --------------------------------------------------------------

  _onDataChange(movieController, oldData, newData) {
    this._api.updateMovie(oldData.id, newData)
      .then((movieModel) => {
        const isSuccess = this._moviesModel.updateMovie(oldData.id, movieModel);

        if (!isSuccess) {
          return;
        }

        const ordinaryController = this._findMovieController(this._shownMovieControllers, movieController);
        const topRatedController = this._findMovieController(this._shownTopRatedMovieControllers, movieController);
        const topCommentedController = this._findMovieController(this._shownTopCommentedMovieControllers, movieController);

        if (ordinaryController) {
          ordinaryController.render(movieModel);
        }
        if (topRatedController) {
          topRatedController.render(movieModel);
        }
        if (topCommentedController) {
          topCommentedController.render(movieModel);
        }
      });
  }

  _findMovieController(controllers, controller) {
    const id = controller.getMovie().id;
    const isFound = controllers.find((item) => item.getMovie().id === id);
    return isFound;
  }

  _onViewChange() {
    this._shownMovieControllers.forEach((item) => {
      item._onViewChange();
    });
  }

  // --------------------------------------------------------------

  _onFilterChange() {
    const oldSort = this._sort;
    this._sort = new Sort();
    replace(this._sort, oldSort);
    this._sort.setSortTypeChangeHandler(this._onSortTypeChange);

    this._updateMovies(SHOWN_FILMS_NUMBER_AT_START);
  }

  _onSortTypeChange(sortType) {
    const movies = this._moviesModel.getMovies();
    this._shownFilmsNumber = SHOWN_FILMS_NUMBER_AT_START;

    const sortedFilms = getSortedFilms(movies, sortType, 0, this._shownFilmsNumber);

    this._removeMovies();

    this._renderMovies(sortedFilms);
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

    this._renderMovies(sortedFilms);

    if (this._shownFilmsNumber >= movies.length) {
      remove(this._moreBtnElement.getElement());
    }
  }

  _renderLoadMoreBtn() {
    if (this._shownFilmsNumber >= this._moviesModel.getMovies().length) {
      remove(this._moreBtnElement.getElement());
      return;
    }
    render(this._filmsList.getElement(), this._moreBtnElement, RenderPosition.BEFOREEND);

    this._moreBtnElement.setClickHandler(this._moreButtonClickHandler);
  }

  // --------------------------------------------------------------

  show() {
    this._filmsSection.show();
  }

  hide() {
    this._filmsSection.hide();
  }
}
