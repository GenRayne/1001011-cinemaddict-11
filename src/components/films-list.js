import AbctractComponent from './abstract-component';

const createFilmsListTemplate = () => `<section class="films-list"></section>`;

export default class FilmsList extends AbctractComponent {
  getTemplate() {
    return createFilmsListTemplate(this._heading);
  }
}
