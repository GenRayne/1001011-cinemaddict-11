import AbstractSmartComponent from './abstract-smart-component';
import {getDateFromNow} from '../utils/common';

const getCommentMarkup = (comment) => {
  const {
    username,
    emoji,
    message,
    date,
  } = comment;

  const commentDate = `${getDateFromNow(date)}`;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${username}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment extends AbstractSmartComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return getCommentMarkup(this._comment);
  }

  setDeleteHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, handler);
  }
}
