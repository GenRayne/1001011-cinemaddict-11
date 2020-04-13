import {createFilmCardTemplate} from './film-card';

const createExtraFilmCardsTemplate = (films) => {
  const cards = [];
  for (const film of films) {
    cards.push(createFilmCardTemplate(film));
  }
  return cards.join(`\n`);
};

const createFilmsExtraTemplate = (heading, films) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${heading}</h2>
      <div class="films-list__container">
        ${createExtraFilmCardsTemplate(films)}
      </div>
    </section>`
  );
};

export {createFilmsExtraTemplate};
