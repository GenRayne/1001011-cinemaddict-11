import MainMenu from '../components/main-menu';
import Statistics from '../components/statistics';
import {getMoviesByFilter, getWatchedMovies} from '../utils/filter';
import {filterByWatchingDates} from '../utils/common';
import {MoviesFilter, RenderPosition, MenuItem, TimePeriod} from '../const';
import {render, replace, remove} from '../utils/render';
import moment from "moment";

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = MoviesFilter.ALL;
    this._filterComponent = null;

    this._filmSection = null;
    this._statisticsComponent = null;
    this._watchedMovies = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onStatsTimePeriodChange = this._onStatsTimePeriodChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  _onFilterChange(filterType) {
    this._setActiveFilter(filterType);

    if (this._filmSection) {
      if (filterType === MenuItem.STATS) {
        this._watchedMovies = getWatchedMovies(this._moviesModel.getMovies());
        this._renderStatsPage(this._watchedMovies);

      } else if (this._statisticsComponent) {
        this._statisticsComponent.hide();
        this._filmSection.show();
      }
    }

    this.render();
  }

  _onStatsTimePeriodChange(timePeriod) {
    this._statsElement = this._statisticsComponent.getStatsElement();
    const dateToday = moment({hour: 0, minute: 0, seconds: 0});

    switch (timePeriod) {
      case TimePeriod.TODAY:
        const moviesToday = filterByWatchingDates(this._watchedMovies, dateToday);
        this._renderStatsPage(moviesToday, timePeriod);
        break;
      case TimePeriod.WEEK:
        const moviesThisWeek = filterByWatchingDates(this._watchedMovies, dateToday.subtract(1, `week`));
        this._renderStatsPage(moviesThisWeek, timePeriod);
        break;
      case TimePeriod.MONTH:
        const moviesThisMonth = filterByWatchingDates(this._watchedMovies, dateToday.subtract(1, `month`));
        this._renderStatsPage(moviesThisMonth, timePeriod);
        break;
      case TimePeriod.YEAR:
        const moviesThisYear = filterByWatchingDates(this._watchedMovies, dateToday.subtract(1, `year`));
        this._renderStatsPage(moviesThisYear, timePeriod);
        break;
      default:
        this._renderStatsPage(this._watchedMovies);
    }
  }

  _setActiveFilter(filterType) {
    this._activeFilterType = filterType;
    this._moviesModel.setFilter(filterType);
  }

  _onDataChange() {
    this.render();
  }

  render(filmSection) {
    if (filmSection) {
      this._filmSection = filmSection;
    }

    const allMovies = this._moviesModel.getMoviesAll();
    const filters = Object.values(MoviesFilter).map((filterType) => ({
      name: filterType,
      count: getMoviesByFilter(allMovies, filterType).length,
      isActive: filterType === this._activeFilterType,
    }));
    const oldComponent = this._filterComponent;

    this._filterComponent = new MainMenu(allMovies, filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _renderStatsPage(movies, period) {
    if (this._statisticsComponent) {
      remove(this._statisticsComponent.getElement());
    }

    this._statisticsComponent = new Statistics(movies, period);
    render(this._container, this._statisticsComponent, RenderPosition.BEFOREEND);
    this._statisticsComponent.renderChart();
    this._statisticsComponent.setTimePeriodToggleHandler(this._onStatsTimePeriodChange);

    this._filmSection.hide();
    this._statisticsComponent.show();
  }
}
