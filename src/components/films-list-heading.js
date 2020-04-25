import AbctractComponent from './abstract-component';
import {filterToNavItemName, MoviesFilter} from '../const';

const DEFAULT_HEADING = `${filterToNavItemName[MoviesFilter.ALL]}. Upcoming`;

const createFilmListHeadingTemplate = (isHidden = true, heading = DEFAULT_HEADING) => {
  const classlist = isHidden ? `films-list__heading visually-hidden` : `films-list__title`;
  return `<h2 class="${classlist}">${heading}</h2>`;
};

export default class FilmListHeading extends AbctractComponent {
  constructor(isHidden, heading) {
    super();
    this._isHidden = isHidden;
    this._heading = heading;
  }

  getTemplate() {
    return createFilmListHeadingTemplate(this._isHidden, this._heading);
  }
}
