import { filterByName } from 'src/utils/filters';

describe('Utils Filter Module', () => {
//name, firstSurname='', secondSurname=''
    const users = [
        { name: 'Jay', firstSurname: 'Garcia' },
        { name: 'Daniel', firstSurname: 'Martinez' },
        { name: 'Antonio', firstSurname: 'Garcia' },
        { name: 'Manuel', firstSurname: 'Garza' }
    ];
    const expectedOutputForGar = [
        { name: 'Jay', firstSurname: 'Garcia' },
        { name: 'Antonio', firstSurname: 'Garcia' },
        { name: 'Manuel', firstSurname: 'Garza' }
    ];

    it('should filter by name', () => {
        expect(users.filter(filterByName('daniel'))).toMatchObject([{ name: 'Daniel', firstSurname: 'Martinez' }]);
        expect(users.filter(filterByName('Jay'))).toMatchObject([{ name: 'Jay', firstSurname: 'Garcia' }]);
        expect(users.filter(filterByName('Gar'))).toMatchObject(expectedOutputForGar);
    });

    it('should return all results on uninitialized filter', () => {
        const emptyFilter = filterByName('');
        expect(users.filter(emptyFilter)).toEqual(users);
    });

})