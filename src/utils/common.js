import moment from "moment";
import {START_INDEX, INPUT_ERROR_SHADOW, SHAKE_TIMEOUT} from '../const';

export const getTopRated = (films, count) => films.slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(START_INDEX, count);

export const getTopCommented = (films, count) => films.slice()
  .sort((a, b) => b.comments.length - a.comments.length)
  .slice(START_INDEX, count);

export const isChecked = (isTrue) => isTrue ? `checked` : ``;

export const shake = (element) => {
  element.classList.add(`shake`);

  setTimeout(() => {
    element.classList.remove(`shake`);
  }, SHAKE_TIMEOUT);
};

// ================= Время / дата =================

export const stylizeInputError = (element) => {
  element.style.boxShadow = INPUT_ERROR_SHADOW;
};

export const stylizeBackToNormal = (element) => {
  element.style = ``;
};

// ================= Время / дата =================

export const formatTime = (date) => moment(date).format(`HH:mm`);

export const formatDate = (date) => moment(date).format(`YYYY/MM/DD`);

export const formatLongDate = (date) => moment(date).format(`D MMMM YYYY`);

export const getDateFromNow = (date) => moment(date).fromNow();

export const getDuration = (minutes) => {
  const hours = moment.duration(minutes, `minutes`).hours();
  const minutesLeft = minutes % 60;
  return hours ? `${hours}h ${minutesLeft}m` : `${minutes}m`;
};

// ============== Случайные значения ==============

export const getRandomInteger = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(array.length);
  return array[randomIndex];
};

export const getRandomBoolean = () => Math.random() > 0.5;

export const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const getRandomArrayFromArray = (array, max, min) => {
  const randomArray = [];
  while (randomArray.length <= getRandomInteger(max, min)) {
    const newItem = getRandomArrayItem(array);
    if (randomArray.indexOf(newItem) === -1) {
      randomArray.push(newItem);
    }
  }
  return randomArray;
};
