import {createFilmCardTemplate} from './film-card';

const EXTRA_FILMS_NUMBER = 2;

const createExtraFilmCardsTemplate = () => {
  const cards = [];
  for (let i = 0; i < EXTRA_FILMS_NUMBER; i++) {
    cards.push(createFilmCardTemplate());
  }
  return cards.join(`\n`);
};

const createFilmsExtraTemplate = (heading) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${heading}</h2>
      <div class="films-list__container">
        ${createExtraFilmCardsTemplate()}
      </div>
    </section>`
  );
};

export {createFilmsExtraTemplate};
