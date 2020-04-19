import {createElement} from '../utils';

const createFooterStatsTemplate = (filmsNumber) => {
  return (
    `<section class="footer__statistics">
      <p>${filmsNumber} movies inside</p>
    </section>`
  );
};

export default class FooterStats {
  constructor(filmsNumber) {
    this._filmsNumber = filmsNumber;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._filmsNumber);
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
