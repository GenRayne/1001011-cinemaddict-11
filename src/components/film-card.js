const createFilmCardTemplate = (film) => {
  const {
    title,
    releaseYear,
    posterSrc,
    genre,
    description,
    duration,
    rating,
    commentsNumber,
    isInWatchlist,
    isWatched,
    isFavourite,
  } = film;

  let shortDescription = description;

  if (shortDescription.length > 140) {
    shortDescription = `${shortDescription.slice(0, 139)}...`;
  }

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${posterSrc}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${commentsNumber} comments</a>
      <form class="film-card__controls">
        <button class="
          film-card__controls-item
          button film-card__controls-item--add-to-watchlist
          ${isInWatchlist ? `film-card__controls-item--active` : ``}
        ">Add to watchlist</button>
        <button class="
          film-card__controls-item button
          film-card__controls-item--mark-as-watched
          ${isWatched ? `film-card__controls-item--active` : ``}
        ">Mark as watched</button>
        <button class="
          film-card__controls-item button
          film-card__controls-item--favorite
          ${isFavourite ? `film-card__controls-item--active` : ``}
        ">Mark as favorite</button>
      </form>
    </article>`
  );
};

export {createFilmCardTemplate};
