import {createElement} from '../utils/render';

const ERROR_IF_NEW = `A new component can't be an instance of AbstractComponent. Use 'extends' instead.`;
const ABSTRACT_METHOD_ERROR = `Abstract method should be implemented.`;

export default class AbctractComponent {
  constructor() {
    if (new.target === AbctractComponent) {
      throw new Error(ERROR_IF_NEW);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(ABSTRACT_METHOD_ERROR);
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
