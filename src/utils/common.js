import moment from "moment";

export const isChecked = (isTrue) => isTrue ? `checked` : ``;

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
