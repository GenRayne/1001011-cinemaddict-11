import AbstractComponent from './abstract-component';

const createFilmsContainerTemplate = () => {
  return `<div class="films-list__container"></div>`;
};

export default class FilmsContainer extends AbstractComponent {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}
