
const normalize = string => string.toLowerCase()
                                  .normalize('NFD')
                                  .replace(/[\u0300-\u036f]/g, '');

export const filterBySearch = (name, inField) => {
    return target => normalize(target[inField]).includes(normalize(name));
}