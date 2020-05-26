import Comment from '../components/comment';
import {render, remove} from '../utils/render';
import {shake} from '../utils/common';
import {RenderPosition, DeletingText} from '../const';

export default class CommentController {
  constructor(container, commentsModel, api, onCommentsChange) {
    this._container = container;
    this._comment = null;
    this._api = api;
    this._commentsModel = commentsModel;
    this._onCommentsChange = onCommentsChange;

    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  render(comment) {
    this._comment = comment;
    this._commentComponent = new Comment(this._comment);
    this._commentComponent.setDeleteHandler(this._onDeleteButtonClick);

    render(this._container, this._commentComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._commentComponent.getElement());
  }

  // ----------------------- Удаление комментария -----------------------

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    evt.target.disabled = true;
    evt.target.textContent = DeletingText.LOADING;

    this._api.deleteComment(this._comment.id)
      .then(() => {
        this._commentsModel.removeComment(this._comment.id);
        this._onCommentsChange(null);
      })
      .catch(() => {
        const commentElement = evt.target.closest(`.film-details__comment`);
        shake(commentElement);
      })
      .then(() => {
        evt.target.disabled = false;
        evt.target.textContent = DeletingText.DEFAULT;
      });
  }
}
