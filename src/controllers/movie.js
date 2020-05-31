import CommentController from '../controllers/comment';
import CommentModel from '../models/comment';
import CommentsLoader from '../components/comments-loader';
import CommentsSection from '../components/comments-section';
import FilmCard from '../components/film-card';
import FilmDetails from '../components/film-details';
import MovieModel from '../models/movie';

import {RenderPosition, Key, LoadingText} from '../const';
import {render, remove, replace} from '../utils/render';
import {stylizeInputError, stylizeBackToNormal, shake} from '../utils/common';

import {encode} from "he";
import moment from "moment";
import {isOnline} from '../api/provider';

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

const parseCommentFormData = (formData) => {
  return new CommentModel({
    id: null,
    author: null,
    emotion: formData.get(`comment-emoji`),
    comment: encode(formData.get(`comment`)),
    date: new Date(),
  });
};

export default class MovieController {
  constructor(container, commentsModel, api, onDataChange, onViewChange) {
    this._container = container;
    this._commentsModel = commentsModel;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;

    this._mode = Mode.DEFAULT;
    this._isFormDisabled = false;

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

    this._filmComponent.setWatchlistIconClickHandler((evt) => {
      evt.preventDefault();
      this._updateFilmData(film, MovieState.WATCHLIST, !this._film.isInWatchlist);
    });

    this._filmComponent.setWatchedIconClickHandler((evt) => {
      evt.preventDefault();
      this._updateFilmData(film, MovieState.WATCHED, !this._film.isWatched);
    });

    this._filmComponent.setFavouriteIconClickHandler((evt) => {
      evt.preventDefault();
      this._updateFilmData(film, MovieState.FAVOURITE, !this._film.isFavourite);
    });

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

  getMovie() {
    return this._film;
  }

  _renderCommentsSection(comments) {
    this._commentsComponent = new CommentsSection(comments);
    render(this._commentsContainer, this._commentsComponent, RenderPosition.BEFOREEND);

    this._input = this._commentsComponent.getCommentInput();
    this._selectedEmojiPlacement = this._commentsComponent.getEmojiPlacement();

    this._renderComments(comments);

    this._commentsComponent.setEmojiClickHandler(this._onEmojiSelect);
    this._filmDetailsComponent.setFormSubmitHandler(() => {
      const formData = this._filmDetailsComponent.getFormData();
      this._onCommentsChange(formData);
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

    this._filmDetailsComponent = new FilmDetails(this._film);
    this._filmDetailsComponent.setCloseBtnClickHandler(this._onCloseBtnClick);

    this._filmDetailsComponent.setWatchlistBtnClickHandler(() => {
      this._updateFilmData(this._film, MovieState.WATCHLIST, !this._film.isInWatchlist);
    });

    this._filmDetailsComponent.setWatchedBtnClickHandler(() => {
      this._updateFilmData(this._film, MovieState.WATCHED, !this._film.isWatched);
    });

    this._filmDetailsComponent.setFavouriteBtnClickHandler(() => {
      this._updateFilmData(this._film, MovieState.FAVOURITE, !this._film.isFavourite);
    });

    this._commentsContainer = this._filmDetailsComponent.getCommentsSectionContainer();
    const commentsLoader = new CommentsLoader(LoadingText.DEFAULT);
    render(this._commentsContainer, commentsLoader, RenderPosition.BEFOREEND);

    this._api.getMovieComments(this._film.id)
      .then((comments) => {
        if (!isOnline()) {
          this._renderGetCommentsError(commentsLoader);
          return;
        }
        remove(commentsLoader.getElement());
        this._commentsModel.setComments(comments);
        this._renderCommentsSection(comments);
      })
      .catch(() => {
        this._renderGetCommentsError(commentsLoader);
      });


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

  // -----------------------------------------------------------

  _updateFilmData(movie, key, value) {
    const oldMovieData = this._film;
    const newMovie = MovieModel.clone(movie);
    newMovie[key] = value;

    if (key === MovieState.WATCHED) {
      newMovie.watchingDate = value ? moment() : null;
    }
    this._onDataChange(this, oldMovieData, newMovie);
  }

  // ---------------------- Выбор эмоции ----------------------

  _onEmojiSelect(evt) {
    if (!this._isFormDisabled) {
      this._emojiImg = this._commentsComponent.createEmojiImg();
      const emojiImageSrc = evt.target.matches(`img`) ? evt.target.src : evt.target.firstElementChild.src;

      const nameStartIndex = emojiImageSrc.lastIndexOf(`/`);
      const nameEndIndex = emojiImageSrc.lastIndexOf(`.`);

      this._emojiName = emojiImageSrc.slice(nameStartIndex + 1, nameEndIndex);

      this._emojiImg.src = `./images/emoji/${this._emojiName}.png`;
      this._emojiImg.alt = `emoji-${this._emojiName}`;

      stylizeBackToNormal(this._selectedEmojiPlacement);
    }
  }

  // ================================ Комментарии ================================

  _renderComments(comments) {
    this._container = this._commentsComponent.getCommentsContainer();
    comments.forEach(this._createCommentController);
  }

  _renderGetCommentsError(commentsLoader) {
    remove(commentsLoader.getElement());
    const errorCommentsLoader = new CommentsLoader(LoadingText.COMMENTS_ERROR);
    render(this._commentsContainer, errorCommentsLoader, RenderPosition.BEFOREEND);
  }

  _createCommentController(comment) {
    const commentController = new CommentController(this._container, this._commentsModel, this._api, this._onCommentsChange);
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

  _showCommentUploadError(element) {
    shake(element);
    stylizeInputError(this._input);
    stylizeInputError(this._selectedEmojiPlacement);
    setTimeout(() => {
      stylizeBackToNormal(this._input);
      stylizeBackToNormal(this._selectedEmojiPlacement);
    }, 1000);
  }

  _clearCommentForm() {
    if (this._commentsComponent) {
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
  }

  _disableCommentForm(isDisabled) {
    if (this._commentsComponent) {
      this._input.disabled = isDisabled;

      this._commentsComponent.getEmojiInputs().forEach((item) => {
        item.disabled = isDisabled;
      });
    }
    this._isFormDisabled = isDisabled;
  }

  _onCommentsChange(newData) {
    stylizeBackToNormal(this._input);
    const comments = this._commentsModel.getComments();
    const newCommentElement = this._commentsComponent.getNewCommentForm();

    if (newData) {
      const newComment = parseCommentFormData(newData);
      const isValid = this._validateNewComment(newComment);

      if (isValid) {
        this._disableCommentForm(true);

        this._api.createComment(newComment, this._film.id)
          .then((commentsModel) => {
            this._commentsModel.setComments(commentsModel);
            this._commentControllers.forEach((controller) => controller.destroy());

            this._commentsModel.getComments()
              .forEach(this._createCommentController);

            this._updateFilmData(this._film, `comments`, this._commentsModel.getComments());

            this._clearCommentForm();
            this._commentsComponent.removeMessageOnInputHandler();
          })
          .catch(() => {
            this._showCommentUploadError(newCommentElement);
          })
          .then(() => {
            this._disableCommentForm(false);
          });

      } else {
        shake(newCommentElement);
        this._commentsComponent.setMessageOnInputHandler(this._validateMessage);
      }

    } else {
      remove(this._commentsComponent.getElement());
      this._filmDetailsComponent.removeFormSubmitHandler();

      this._renderCommentsSection(comments);
      this._updateFilmData(this._film, `comments`, comments);
    }
  }
}
