import MainMenu from '../components/main-menu';
import {getMoviesByFilter} from '../utils/filter';
import {MoviesFilter, RenderPosition, MenuItem} from '../const';
import {render, replace} from '../utils/render';

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = MoviesFilter.ALL;
    this._filterComponent = null;

    this._filmSection = null;
    this._statisticsComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  _onFilterChange(filterType) {
    this._setActiveFilter(filterType);

    if (this._filmSection && this._statisticsComponent) {
      if (filterType === MenuItem.STATS) {
        this._filmSection.hide();
        this._statisticsComponent.show();
      } else {
        this._statisticsComponent.hide();
        this._filmSection.show();
      }
    }

    this.render();
  }

  _setActiveFilter(filterType) {
    this._activeFilterType = filterType;
    this._moviesModel.setFilter(filterType);
  }

  _onDataChange() {
    this.render();
  }

  render(filmSection, statisticsComponent) {
    if (filmSection && statisticsComponent) {
      this._filmSection = filmSection;
      this._statisticsComponent = statisticsComponent;
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
}
