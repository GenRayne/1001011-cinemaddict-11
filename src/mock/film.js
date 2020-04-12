import {
  getRandomInteger,
  getRandomBoolean,
  getRandomArrayItem,
  getRandomDate,
} from '../utils';
import {EMOJIS} from '../const';

const MIN_SENTENCES_NUMBER = 1;
const MAX_SENTENCES_NUMBER = 5;

const MIN_RELEASE_DATE = new Date(1920, 0, 1);
const MAX_RELEASE_DATE = new Date(1999, 11, 31);

const MAX_DURATION_H = 1;
const MIN_DURATION_M = 30;
const MAX_DURATION_M = 59;

const MIN_GENRES_NUMBER = 1;
const MAX_GENRES_NUMBER = 3;

const MIN_PEOPLE_NUMBER = 1;
const MAX_PEOPLE_NUMBER = 3;

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
  `Mystery`,
];

const countries = [
  `USA`,
  `Germany`,
  `France`,
];

const filmCrew = [
  `Anthony Mann`,
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
];

const usernames = [
  `Tim Macoveev`,
  `Malcolm Reynolds`,
  `Keanu Reeves`,
  `Peter Pan`,
  `John Doe`,
];

const messages = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `I was aiming for the head...`,
  `No, you're breathtaking!`,
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

const getRandomArrayFromArray = (array, max, min) => {
  const randomArray = [];
  while (randomArray.length <= getRandomInteger(max, min)) {
    const newItem = getRandomArrayItem(array);
    if (randomArray.indexOf(newItem) === -1) {
      randomArray.push(newItem);
    }
  }
  return randomArray;
};

const generateComment = () => {
  return {
    username: getRandomArrayItem(usernames),
    emoji: getRandomArrayItem(EMOJIS),
    message: getRandomArrayItem(messages),
    date: getRandomDate(new Date(2010, 0, 1), new Date()),
  };
};

const generateComments = () => {
  return new Array(getRandomInteger(MAX_COMMENTS_NUMBER))
    .fill(``).map(generateComment);
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
    releaseDate: getRandomDate(MIN_RELEASE_DATE, MAX_RELEASE_DATE),

    rating: (Math.random() * 10).toFixed(1),
    duration: `${durationHours}${durationMinutes}`,
    genres: getRandomArrayFromArray(genres, MAX_GENRES_NUMBER, MIN_GENRES_NUMBER),

    director: getRandomArrayItem(filmCrew),
    writers: getRandomArrayFromArray(filmCrew, MAX_PEOPLE_NUMBER, MIN_PEOPLE_NUMBER),
    actors: getRandomArrayFromArray(filmCrew, MAX_PEOPLE_NUMBER, MIN_PEOPLE_NUMBER),

    country: getRandomArrayItem(countries),
    age: getRandomBoolean() ? `18+` : `12+`,

    isInWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavourite: getRandomBoolean(),

    comments: generateComments(),
  };
};

const generateFilms = (count) => {
  return new Array(count).fill(``).map(generateFilm);
};

export {generateFilm, generateFilms};
