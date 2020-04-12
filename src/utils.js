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

export const getRandomDate = () => {
  const newDate = new Date();
  const sign = getRandomBoolean() ? 1 : -1;
  const diffValue = sign * getRandomInteger(8);

  newDate.setDate(newDate.getDate() + diffValue);

  return newDate;
};
