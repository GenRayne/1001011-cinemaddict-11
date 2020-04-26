import AbctractComponent from './abstract-component';

const createFilmsExtraTemplate = (heading) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${heading}</h2>
    </section>`
  );
};

export default class FilmsExtra extends AbctractComponent {
  constructor(heading, films) {
    super();
    this._films = films;
    this._heading = heading;
  }

  getTemplate() {
    return createFilmsExtraTemplate(this._heading, this._films);
  }
}
