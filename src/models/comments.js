import {START_INDEX} from '../const';

export default class Comments {
  constructor() {
    this._comments = [];

    this._dataChangeHandlers = [];
  }

  // ------------------------- Get -------------------------

  getComments() {
    return this._comments;
  }

  // ------------------------- Set -------------------------

  setComments(comments) {
    this._comments = Array.from(comments);
    this._callHandlers(this._dataChangeHandlers);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  // -----------------------------------------------

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  addComment(comment) {
    this._comments = [].concat(this._comments, comment);
    this._callHandlers(this._dataChangeHandlers);
  }

  removeComment(id) {
    const index = this._comments.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(START_INDEX, index), this._comments.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);
    return true;
  }
}
