import AbctractComponent from './abstract-component';

const createMoreBtnTemplate = () => `<button class="films-list__show-more">Show more</button>`;

export default class MoreBtn extends AbctractComponent {
  getTemplate() {
    return createMoreBtnTemplate();
  }
}
