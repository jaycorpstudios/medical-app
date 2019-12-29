
export const normalize = (string = '') => string.toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

export const filterByName = (criteria) => (target) => {
  const { name, firstSurname = '', secondSurname = '' } = target;
  const fullName = `${name} ${firstSurname} ${secondSurname}`;
  return normalize(fullName).includes(normalize(criteria));
};
