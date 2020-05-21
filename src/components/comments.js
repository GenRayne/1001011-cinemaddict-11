import AbstractSmartComponent from './abstract-smart-component';
import {getDateFromNow} from '../utils/common';

const getCommentsMarkup = (comments) => {
  const movieComments = comments.map((comment) => {
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
  }).join(`\n`);

  return (
    `<ul class="film-details__comments-list">
      ${movieComments}
    </ul>`
  );
};

export default class Comments extends AbstractSmartComponent {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return getCommentsMarkup(this._comments);
  }
}
