import AbctractComponent from './abstract-component';

const createFilmsContainerTemplate = () => {
  return `<div class="films-list__container"></div>`;
};

export default class FilmsContainer extends AbctractComponent {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}
