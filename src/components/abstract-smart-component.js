import AbstractComponent from "./abstract-component.js";
import {AbstractComponentError} from '../const';

const RECOVER_LISTENERS_NAME = `recoverListeners`;

export default class AbstractSmartComponent extends AbstractComponent {
  recoverListeners() {
    throw new Error(AbstractComponentError.methodNotImplemented(RECOVER_LISTENERS_NAME));
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);

    this.recoverListeners();
  }
}
