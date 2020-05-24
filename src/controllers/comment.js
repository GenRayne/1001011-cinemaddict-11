import Comment from '../components/comment';
import {render} from '../utils/render';
import {RenderPosition} from '../const';

export default class CommentController {
  constructor(container, commentsModel, onCommentsChange, onViewChange) {
    this._container = container;
    this._comment = null;
    this._commentsModel = commentsModel;
    this._onDataChange = onCommentsChange;
    this._onViewChange = onViewChange;

    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  render(comment) {
    this._comment = comment;
    this._commentComponent = new Comment(this._comment);
    this._commentComponent.setDeleteHandler(this._onDeleteButtonClick);

    render(this._container, this._commentComponent, RenderPosition.BEFOREEND);
  }

  // ----------------------- Удаление комментария -----------------------

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    this._commentsModel.removeComment(this._comment.id);
    this._onDataChange(null);
  }
}
