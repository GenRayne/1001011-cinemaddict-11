import MainMenu from '../components/main-menu';
import {getMoviesByFilter} from '../utils/filter';
import {MoviesFilter, RenderPosition} from '../const';
import {render, replace} from '../utils/render';

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = MoviesFilter.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this.render();
  }

  _onDataChange() {
    this.render();
  }

  render() {
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
