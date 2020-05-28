import MainMenu from '../components/main-menu';
import Statistics from '../components/statistics';
import {getMoviesByFilter} from '../utils/filter';
import {MoviesFilter, RenderPosition, MenuItem} from '../const';
import {render, replace, remove} from '../utils/render';

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

    if (this._filmSection) {
      if (filterType === MenuItem.STATS) {
        if (this._statisticsComponent) {
          remove(this._statisticsComponent.getElement());
        }

        this._statisticsComponent = new Statistics(this._moviesModel.getMovies());
        render(this._container, this._statisticsComponent, RenderPosition.BEFOREEND);
        this._statisticsComponent.renderChart();

        this._filmSection.hide();
        this._statisticsComponent.show();

      } else if (this._statisticsComponent) {
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
}
