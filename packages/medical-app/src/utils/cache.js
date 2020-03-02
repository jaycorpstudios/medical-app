const cachePrefix = 'villafeet';

function setItem(id, data) {
  const stringData = JSON.stringify(data);
  window.localStorage.setItem(`${cachePrefix}-${id}`, stringData);
}

function getItem(id) {
  const stringData = window.localStorage.getItem(`${cachePrefix}-${id}`);
  return JSON.parse(stringData);
}

const cacheHelper = {
  setItem,
  getItem,
};
export default cacheHelper;
