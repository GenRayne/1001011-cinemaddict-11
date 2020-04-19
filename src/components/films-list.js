import {createElement} from '../utils';
import {navItemsNames} from '../const';

const createFilmsListTemplate = (heading = navItemsNames.ALL) => {
  return (
    `<section class="films-list">
      <h2 class="films-list__heading visually-hidden">${heading}. Upcoming</h2>
    </section>`
  );
};

export default class FilmsList {
  constructor(heading) {
    this._heading = heading;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate(this._heading);
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
