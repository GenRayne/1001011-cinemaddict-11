import {AbstractComponentError, HIDDEN_CLASS} from '../const';
import {createElement} from '../utils/render';

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(AbstractComponentError.NEW);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(AbstractComponentError.GET_TEMPLATE_NOT_IMPLEMENTED);
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

  show() {
    this.getElement().classList.remove(HIDDEN_CLASS);
  }

  hide() {
    this.getElement().classList.add(HIDDEN_CLASS);
  }
}
