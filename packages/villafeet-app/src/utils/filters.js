
const normalize = (string='') => string.toLowerCase()
                                  .normalize('NFD')
                                  .replace(/[\u0300-\u036f]/g, '');

export const filterByName = (criteria) => {
    return target => {
        const { name, firstSurname='', secondSurname='' } = target;
        const fullName = `${name} ${firstSurname} ${secondSurname}`;
        return normalize(fullName).includes(normalize(criteria));
    };
}