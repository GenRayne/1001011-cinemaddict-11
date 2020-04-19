import {createFilmCardTemplate} from './film-card';
import {createElement} from '../utils';

const createExtraFilmCardsTemplate = (films) => {
  const cards = [];
  for (const film of films) {
    cards.push(createFilmCardTemplate(film));
  }
  return cards.join(`\n`);
};

const createFilmsExtraTemplate = (heading, films) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${heading}</h2>
      <div class="films-list__container">
        ${createExtraFilmCardsTemplate(films)}
      </div>
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
