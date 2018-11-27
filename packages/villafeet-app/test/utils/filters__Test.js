import { filterBySearch } from 'src/utils/filters';

describe('Utils Filter Module', () => {

    const users = [
        {name: 'Jay', lastName: 'Garcia' },
        {name: 'Daniel', lastName: 'Martinez' },
        {name: 'Antonio', lastName: 'Garcia' },
        {name: 'Manuel', lastName: 'Garza' }
    ]

    it('should filter by name', () => {
        const filter = filterBySearch('daniel', 'name');
        expect(users.filter(filter)).toMatchObject([{name: 'Daniel', lastName: 'Martinez' }]);
    });

    it('should filter by lastname', () => {
        const filter = filterBySearch('gar', 'lastName');
        const expectedOutput = [
            {name: 'Jay', lastName: 'Garcia' },
            {name: 'Antonio', lastName: 'Garcia' },
            {name: 'Manuel', lastName: 'Garza' }
        ]
        expect(users.filter(filter)).toMatchObject(expectedOutput);
    });

    it('should return all results on uninitialized filter', () => {
        const emptyFilter = filterBySearch();
        expect([1,2,3].filter(emptyFilter)).toMatchObject([1,2,3]);
    });

})