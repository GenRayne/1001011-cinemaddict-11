export const getRandomInteger = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(array.length);
  return array[randomIndex];
};

export const getRandomBoolean = () => {
  return Math.random() > 0.5;
};

export const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
