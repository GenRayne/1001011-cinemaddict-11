import {getRandomInteger, getRandomBoolean, getRandomArrayItem} from '../utils';

const MIN_SENTENCES_NUMBER = 1;
const MAX_SENTENCES_NUMBER = 5;
const MIN_RELEASE_YEAR = 1920;
const MAX_RELEASE_YEAR = 2000;
const MAX_DURATION_H = 1;
const MIN_DURATION_M = 30;
const MAX_DURATION_M = 59;
const MAX_COMMENTS_NUMBER = 5;

const filmTitles = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `Made for Each Other`,
  `The Great Flamarion`,
];

const posterSrcs = [
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/made-for-each-other.png`,
  `./images/posters/the-great-flamarion.jpg`,
];

const descriptionParts = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const genres = [
  `Musical`,
  `Drama`,
  `Western`,
  `Comedy`,
  `Cartoon`,
  `Mystery`
];

const getDesriptionSentences = (sentencesNumber) => {
  let descriptionSentences = [];
  for (let i = 0; i < descriptionParts.length; i++) {
    if (descriptionSentences.length >= sentencesNumber) {
      break;
    }
    if (getRandomBoolean()) {
      descriptionSentences.push(descriptionParts[i]);
    }
  }
  if (!descriptionSentences.length) {
    descriptionSentences.push(getRandomArrayItem(descriptionParts));
  }

  return descriptionSentences;
};

const generateFilm = () => {
  const randomIndex = getRandomInteger(filmTitles.length);
  const sentencesNumber = getRandomInteger(MAX_SENTENCES_NUMBER, MIN_SENTENCES_NUMBER);

  const durationHours = getRandomInteger(MAX_DURATION_H) ? `${getRandomInteger(MAX_DURATION_H)}h ` : ``;
  const durationMinutes = `${getRandomInteger(MAX_DURATION_M, MIN_DURATION_M)}m`;

  return {
    title: filmTitles[randomIndex],
    posterSrc: posterSrcs[randomIndex],
    description: getDesriptionSentences(sentencesNumber).join(` `),
    rating: (Math.random() * 10).toFixed(1),
    releaseYear: getRandomInteger(MAX_RELEASE_YEAR, MIN_RELEASE_YEAR),
    duration: `${durationHours}${durationMinutes}`,
    genre: getRandomArrayItem(genres),

    isInWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavourite: getRandomBoolean(),

    commentsNumber: getRandomInteger(MAX_COMMENTS_NUMBER),
  };
};

const generateFilms = (count) => {
  return new Array(count).fill(``).map(generateFilm);
};

export {generateFilm, generateFilms};
