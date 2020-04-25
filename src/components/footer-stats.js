import AbctractComponent from './abstract-component';

const createFooterStatsTemplate = (filmsNumber) => {
  return (
    `<section class="footer__statistics">
      <p>${filmsNumber} movies inside</p>
    </section>`
  );
};

export default class FooterStats extends AbctractComponent {
  constructor(filmsNumber) {
    super();
    this._filmsNumber = filmsNumber;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._filmsNumber);
  }
}
