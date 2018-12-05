import { filterByName } from 'src/utils/filters';

describe('Utils Filter Module', () => {

    const users = [
        { personal: { nombre: 'Jay', apellidoPaterno: 'Garcia' } },
        { personal: { nombre: 'Daniel', apellidoPaterno: 'Martinez' } },
        { personal: { nombre: 'Antonio', apellidoPaterno: 'Garcia' } },
        { personal: { nombre: 'Manuel', apellidoPaterno: 'Garza' } }
    ]

    it('should filter by name', () => {
        const filter = filterByName('daniel', 'name');
        expect(users.filter(filter)).toMatchObject([{ personal: { nombre: 'Daniel', apellidoPaterno: 'Martinez' } }]);
    });

    it('should return all results on uninitialized filter', () => {
        const emptyFilter = filterByName('');
        expect(users.filter(emptyFilter)).toEqual(users);
    });

})