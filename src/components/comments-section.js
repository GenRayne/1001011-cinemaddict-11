import {EMOJIS, Key} from '../const';
import AbstractSmartComponent from './abstract-smart-component';

const SELECTED_EMOJI_MARKUP = `<img width="55" height="55">`;

const commentEmojis = EMOJIS.map((emoji) => {
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`
  );
}).join(`\n`);

const createCommentsSectionMarkup = (comments) => {
  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title"
        >Comments <span class="film-details__comments-count"
        >${comments.length}</span></h3>

      <ul class="film-details__comments-list">
      </ul>

      <div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          ${commentEmojis}
        </div>
      </div>
    </section>`
  );
};

export default class CommentsSection extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createCommentsSectionMarkup(this._film);
  }

  setEmojiClickHandler(handler) {
    const emojis = Array.from(this.getElement().querySelectorAll(`.film-details__emoji-label`));

    emojis.forEach((item) => {
      item.addEventListener(`click`, handler);
    });
  }

  getCommentsContainer() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }

  getCommentInput() {
    return this.getElement().querySelector(`.film-details__comment-input`);
  }

  getEmojiInputs() {
    return this.getElement().querySelectorAll(`.film-details__emoji-item`);
  }

  getEmojiPlacement() {
    this._emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);
    return this._emojiContainer;
  }

  createEmojiImg() {
    this._emojiContainer.innerHTML = SELECTED_EMOJI_MARKUP;
    return this._emojiContainer.firstElementChild;
  }

  // ------------------------------- Слушатели -------------------------------

  setMessageOnInputHandler(handler) {
    this._onInputHandler = handler;

    this.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._onInputHandler);
  }

  removeMessageOnInputHandler() {
    if (this._onInputHandler) {
      const input = this.getElement().querySelector(`.film-details__comment-input`);
      input.removeEventListener(`input`, this._onInputHandler);
    }
  }

  // Возможно стоит оставить хэндлер на форме, а не на поле.
  // setCommentSendHandler(handler) {
  //   this.getElement().querySelector(`.film-details__comment-input`)
  //     .addEventListener(`keydown`, (evt) => {
  //       if (evt.key === Key.ENTER && (evt.ctrlKey || evt.metaKey)) {
  //         handler(evt);
  //       }
  //     });
  // }
}
