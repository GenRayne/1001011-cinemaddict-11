import AbstractComponent from './abstract-component';

const createMoreBtnTemplate = () => `<button class="films-list__show-more">Show more</button>`;

export default class MoreBtn extends AbstractComponent {
  getTemplate() {
    return createMoreBtnTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
