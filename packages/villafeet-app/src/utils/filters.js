
const normalize = (string='') => string.toLowerCase()
                                  .normalize('NFD')
                                  .replace(/[\u0300-\u036f]/g, '');

export const filterByName = (criteria) => {
    return target => {
        const { nombre, apellidoPaterno='', apellidoMaterno='' } = target.personal;
        const nombreCompleto = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
        return normalize(nombreCompleto).includes(normalize(criteria));
    };
}