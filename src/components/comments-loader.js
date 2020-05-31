import AbstractComponent from './abstract-component';

const createLoaderMarkup = (text) => {
  return (
    `<h3 class="film-details__comments-title"
      >${text}</h3>`
  );
};

export default class CommentsLoader extends AbstractComponent {
  constructor(text) {
    super();
    this._text = text;
  }

  getTemplate() {
    return createLoaderMarkup(this._text);
  }
}
