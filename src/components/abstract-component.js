import {createElement} from '../utils/render';
import {AbstractComponentError} from '../const';

const GET_TEMPLATE_NAME = `getTemplate`;

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(AbstractComponentError.NEW);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(AbstractComponentError.methodNotImplemented(GET_TEMPLATE_NAME));
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
