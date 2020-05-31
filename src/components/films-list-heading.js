import AbstractComponent from './abstract-component';
import {filterToNavItemName, MoviesFilter} from '../const';

const DEFAULT_HEADING = `${filterToNavItemName[MoviesFilter.ALL]}. Upcoming`;

const createFilmsListHeadingTemplate = (isHidden = true, heading = DEFAULT_HEADING) => {
  const classlist = isHidden ? `films-list__heading visually-hidden` : `films-list__title`;
  return `<h2 class="${classlist}">${heading}</h2>`;
};

export default class FilmsListHeading extends AbstractComponent {
  constructor(isHidden, heading) {
    super();
    this._isHidden = isHidden;
    this._heading = heading;
  }

  getTemplate() {
    return createFilmsListHeadingTemplate(this._isHidden, this._heading);
  }
}
