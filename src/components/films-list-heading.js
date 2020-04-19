import {createElement} from '../utils';
import {filterToNavItemName, MoviesFilter} from '../const';

const DEFAULT_HEADING = `${filterToNavItemName[MoviesFilter.ALL]}. Upcoming`;

const createFilmListHeadingTemplate = (isHidden = true, heading = DEFAULT_HEADING) => {
  const classlist = isHidden ? `films-list__heading visually-hidden` : `films-list__title`;
  return `<h2 class="${classlist}">${heading}</h2>`;
};

export default class FilmListHeading {
  constructor(isHidden, heading) {
    this._isHidden = isHidden;
    this._heading = heading;
    this._element = null;
  }

  getTemplate() {
    return createFilmListHeadingTemplate(this._isHidden, this._heading);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
