export const setInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getInLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  if (!value) {
    return null;
  }
  return JSON.parse(value);
};
