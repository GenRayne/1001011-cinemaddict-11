import AbctractComponent from './abstract-component';

const createFilmsSectionTemplate = () => `<section class="films"></section>`;

export default class FilmsSection extends AbctractComponent {
  getTemplate() {
    return createFilmsSectionTemplate();
  }
}
