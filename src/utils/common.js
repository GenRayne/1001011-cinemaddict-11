export const isChecked = (isTrue) => isTrue ? `checked` : ``;

// ================= Время / дата =================

export const castTimeFormat = (value) => String(value).padStart(2, `0`);

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const formatDate = (date) => {
  const month = castTimeFormat(date.getMonth());
  const day = castTimeFormat(date.getDate());

  return `${date.getFullYear()}/${month}/${day}`;
};

export const formatLongDate = (date) => {
  const formatter = new Intl.DateTimeFormat(`en-US`, {
    year: `numeric`,
    month: `long`,
  });

  return formatter.format(date);
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
