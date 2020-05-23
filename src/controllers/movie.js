import CommentController from '../controllers/comment';
import CommentsSection from '../components/comments-section';
import FilmCard from '../components/film-card';
import FilmDetails from '../components/film-details';
import {RenderPosition, Key} from '../const';
import {render, remove, replace} from '../utils/render';
import {stylizeInputError, stylizeBackToNormal} from '../utils/common';

const Mode = {
  DEFAULT: `default`,
  DETAILED: `detailed`
};

const MovieState = {
  WATCHLIST: `isInWatchlist`,
  WATCHED: `isWatched`,
  FAVOURITE: `isFavourite`
};

const bodyElement = document.querySelector(`body`);

export default class MovieController {
  constructor(container, commentsModel, onDataChange, onViewChange) {
    this._container = container;
    this._commentsModel = commentsModel;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._commentsComponent = null;
    this._commentsContainer = null;
    this._selectedEmojiPlacement = null;
    this._emojiImg = null;

    this._commentControllers = [];

    this._onEscapePress = this._onEscapePress.bind(this);
    this._onPopupOpen = this._onPopupOpen.bind(this);
    this._onCloseBtnClick = this._onCloseBtnClick.bind(this);

    this._onWatchlistIconClick = this._onWatchlistIconClick.bind(this);
    this._onWatchedIconClick = this._onWatchedIconClick.bind(this);
    this._onFavouriteIconClick = this._onFavouriteIconClick.bind(this);

    this._onWatchlistBtnClick = this._onWatchlistBtnClick.bind(this);
    this._onWatchedBtnClick = this._onWatchedBtnClick.bind(this);
    this._onFavouriteBtnClick = this._onFavouriteBtnClick.bind(this);

    this._createCommentController = this._createCommentController.bind(this);
    this._onEmojiSelect = this._onEmojiSelect.bind(this);
    this._validateMessage = this._validateMessage.bind(this);
    this._onCommentsChange = this._onCommentsChange.bind(this);
  }

  setDefaultView() {
    if (!this._mode !== Mode.DEFAULT) {
      remove(this._filmDetailsComponent.getElement());
      this._clearCommentForm();

      this._mode = Mode.DEFAULT;
    }
  }

  // ================================== Рендер ==================================

  render(film) {
    const oldFilmComponent = this._filmComponent;

    this._film = film;
    this._filmComponent = new FilmCard(this._film);

    this._filmComponent.setPosterClickHandler(this._onPopupOpen);
    this._filmComponent.setTitleClickHandler(this._onPopupOpen);
    this._filmComponent.setCommentsClickHandler(this._onPopupOpen);

    this._filmComponent.setWatchlistIconClickHandler(this._onWatchlistIconClick);
    this._filmComponent.setWatchedIconClickHandler(this._onWatchedIconClick);
    this._filmComponent.setFavouriteIconClickHandler(this._onFavouriteIconClick);

    if (oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
    } else {
      render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
    }
  }

  destroy() {
    remove(this._filmComponent.getElement());
    if (this._filmDetailsComponent) {
      remove(this._filmDetailsComponent.getElement());
    }
    document.removeEventListener(`keydown`, this._onEscapePress);
  }

  _renderCommentsSection(comments) {
    this._commentsComponent = new CommentsSection(comments);
    this._commentsContainer = this._filmDetailsComponent.getCommentsSectionContainer();
    render(this._commentsContainer, this._commentsComponent, RenderPosition.BEFOREEND);

    this._input = this._commentsComponent.getCommentInput();
    this._selectedEmojiPlacement = this._commentsComponent.getEmojiPlacement();

    this._renderComments(comments);

    this._commentsComponent.setEmojiClickHandler(this._onEmojiSelect);
    this._filmDetailsComponent.setFormSubmitHandler(() => {
      const data = this._filmDetailsComponent.getData();
      this._onCommentsChange(data);
    });
  }

  // ================================ Обработчики ================================

  _onEscapePress(evt) {
    if (evt.key === Key.ESCAPE) {
      this.setDefaultView();
      document.removeEventListener(`keydown`, this._onEscapePress);
    }
  }

  _onPopupOpen() {
    this._mode = Mode.DETAILED;

    const oldFilmDetailsComponent = this._filmDetailsComponent;
    const comments = this._commentsModel.getComments();

    this._filmDetailsComponent = new FilmDetails(this._film);
    this._filmDetailsComponent.setCloseBtnClickHandler(this._onCloseBtnClick);

    this._filmDetailsComponent.setWatchlistBtnClickHandler(this._onWatchlistBtnClick);
    this._filmDetailsComponent.setWatchedBtnClickHandler(this._onWatchedBtnClick);
    this._filmDetailsComponent.setFavouriteBtnClickHandler(this._onFavouriteBtnClick);

    this._renderCommentsSection(comments);

    if (oldFilmDetailsComponent) {
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    }

    bodyElement.append(this._filmDetailsComponent.getElement());

    document.addEventListener(`keydown`, this._onEscapePress);
  }

  _onCloseBtnClick() {
    this.setDefaultView();
    document.removeEventListener(`keydown`, this._onEscapePress);
  }

  // ---------------------- Выбор эмоции ----------------------

  _onEmojiSelect(evt) {
    this._emojiImg = this._commentsComponent.createEmojiImg();
    const emojiImageSrc = evt.target.matches(`img`) ? evt.target.src : evt.target.firstElementChild.src;

    const nameStartIndex = emojiImageSrc.lastIndexOf(`/`);
    const nameEndIndex = emojiImageSrc.lastIndexOf(`.`);

    this._emojiName = emojiImageSrc.slice(nameStartIndex + 1, nameEndIndex);

    this._emojiImg.src = `./images/emoji/${this._emojiName}.png`;
    this._emojiImg.alt = `emoji-${this._emojiName}`;

    stylizeBackToNormal(this._selectedEmojiPlacement);
  }

  // -----------------------------------------------------------

  _updateFilmData(key, value) {
    const oldFilmData = this._film;
    const newFilmData = Object.assign({}, this._film, {
      [key]: value
    });
    this._onDataChange(this, oldFilmData, newFilmData);
  }

  // ----------------------- К просмотру -----------------------

  _onWatchlistIconClick(evt) {
    evt.preventDefault();
    this._updateFilmData(MovieState.WATCHLIST, !this._film.isInWatchlist);
  }

  _onWatchlistBtnClick() {
    this._film.isInWatchlist = !this._film.isInWatchlist;
    this.render(this._film);
  }

  // ----------------------- Просмотрено -----------------------

  _onWatchedIconClick(evt) {
    evt.preventDefault();
    this._updateFilmData(MovieState.WATCHED, !this._film.isWatched);
  }

  _onWatchedBtnClick() {
    this._film.isWatched = !this._film.isWatched;
    this.render(this._film);
  }

  // ------------------------ Избранное ------------------------

  _onFavouriteIconClick(evt) {
    evt.preventDefault();
    this._updateFilmData(MovieState.FAVOURITE, !this._film.isFavourite);
  }

  _onFavouriteBtnClick() {
    this._film.isFavourite = !this._film.isFavourite;
    this.render(this._film);
  }

  // ================================ Комментарии ================================

  _renderComments(comments) {
    this._container = this._commentsComponent.getCommentsContainer();
    comments.forEach(this._createCommentController);
  }

  _createCommentController(comment) {
    const commentController = new CommentController(this._container, this._commentsModel, this._onCommentsChange);
    this._commentControllers.push(commentController);
    commentController.render(comment);
  }

  _validateNewComment(comment) {
    const {emoji, message} = comment;

    if (!emoji) {
      stylizeInputError(this._selectedEmojiPlacement);
    }
    if (!message) {
      stylizeInputError(this._input);
    }

    return !!(emoji && message);
  }

  _validateMessage(evt) {
    if (evt.target.value) {
      stylizeBackToNormal(evt.target);
    }
  }

  _clearCommentForm() {
    this._input.value = ``;

    this._commentsComponent.getEmojiInputs().forEach((item) => {
      item.checked = false;
    });

    if (this._emojiImg) {
      remove(this._emojiImg);
    }

    stylizeBackToNormal(this._selectedEmojiPlacement);
    stylizeBackToNormal(this._input);
  }

  _onCommentsChange(newComment) {
    const comments = this._commentsModel.getComments();

    if (newComment) {
      const isValid = this._validateNewComment(newComment);

      if (isValid) {
        this._commentsModel.addComment(newComment);
        this._createCommentController(newComment);
        this._updateFilmData(`comments`, this._commentsModel.getComments());

        this._clearCommentForm();
        this._commentsComponent.removeMessageOnInputHandler();
      } else {
        this._commentsComponent.setMessageOnInputHandler(this._validateMessage);
      }
    } else {
      remove(this._commentsComponent.getElement());
      this._filmDetailsComponent.removeFormSubmitHandler();

      this._renderCommentsSection(comments);
      this._updateFilmData(`comments`, comments);
    }
  }
}
