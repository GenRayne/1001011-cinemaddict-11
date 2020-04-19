import {createElement} from '../utils';

const createFilmsListTemplate = () => `<section class="films-list"></section>`;

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
