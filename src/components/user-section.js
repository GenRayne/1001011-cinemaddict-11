const createUserSection = (films) => {
  const watchedFilmsNumber = films.filter((film) => {
    return film.isWatched;
  });

  let userRating = ``;

  if (watchedFilmsNumber.length > 0 && watchedFilmsNumber.length <= 10) {
    userRating = `Novice`;
  } else if (watchedFilmsNumber.length > 10 && watchedFilmsNumber.length <= 20) {
    userRating = `Fan`;
  } else if (watchedFilmsNumber.length > 20) {
    userRating = `Movie Buff`;
  }

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export {createUserSection};
