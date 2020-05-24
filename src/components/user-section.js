import AbstractComponent from './abstract-component';
import {UserRating, RatingStep} from '../const';

const createUserSectionTemplate = (films) => {
  const filmsWatched = films.filter((film) => {
    return film.isWatched;
  }).length;

  let userRating = ``;

  if (filmsWatched && filmsWatched <= RatingStep.FIRST) {
    userRating = UserRating.NOVICE;
  } else if (filmsWatched > RatingStep.FIRST
          && filmsWatched <= RatingStep.SECOND) {
    userRating = UserRating.FAN;
  } else if (filmsWatched > RatingStep.SECOND) {
    userRating = UserRating.MOVIE_BUFF;
  }

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserSection extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createUserSectionTemplate(this._films);
  }
}
