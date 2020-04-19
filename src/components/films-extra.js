import {createElement} from '../utils';

const createFilmsExtraTemplate = (heading) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${heading}</h2>
    </section>`
  );
};

export default class FilmsExtra {
  constructor(heading, films) {
    this._films = films;
    this._heading = heading;
    this._element = null;
  }

  getTemplate() {
    return createFilmsExtraTemplate(this._heading, this._films);
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
