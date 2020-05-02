import AbstractComponent from "./abstract-component.js";

const ABSTRACT_METHOD_ERROR = `Abstract method should be implemented.`;

export default class AbstractSmartComponent extends AbstractComponent {
  recoverListeners() {
    throw new Error(ABSTRACT_METHOD_ERROR);
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
