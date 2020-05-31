import AbstractComponent from './abstract-component';
import {getUserRating} from '../utils/common';

const createUserSectionTemplate = (movies) => {
  const userRating = getUserRating(movies);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserSection extends AbstractComponent {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createUserSectionTemplate(this._movies);
  }
}
